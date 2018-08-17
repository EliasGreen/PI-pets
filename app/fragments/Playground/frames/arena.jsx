const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const Cat = require("../../../pets/cat");
const Dog = require("../../../pets/dog");


class Arena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      chosenPetForBattleID: null,
      reportsAboutLastBattles: <LoadingCircleSpinner target={ "arenaReports" }/>,
      aliveUserPets: null
    }
    
    this.loadAliveUserPets = this.loadAliveUserPets.bind(this);
    this.compilePetsIntoPetArenaCardsForChoosing = this.compilePetsIntoPetArenaCardsForChoosing.bind(this);
  }
  
  compilePetsIntoPetArenaCardsForChoosing(alivePets) {
    if (alivePets === null) {
     return <LoadingCircleSpinner target={ "arenaAlivePetsCards" }/>;
    }
    
    const petComponents = {
      "Cat": Cat,
      "Dog": Dog
    }
    
   return alivePets.map(pet => {
     const PetComponent = petComponents[pet.type];
     
     return(
       <div className="petArenaCard" key={pet._id}>
         <div className="containerForPet">
            <PetComponent 
                 pet={pet} 
            />
         </div>
         <h3 className="petName">{ pet.nickname }</h3>
       </div>
     );  
   });; 
  }
  
  async loadAliveUserPets() {
    try {
      const response = await fetch("/user/pets", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        aliveUserPets: result.pets.filter(pet => pet.alive === true)
      });

    } 
    catch(loadingError) {
      this.setState({
        loadingError
      });
    }
  }
  
  componentDidMount() {
    this.loadAliveUserPets();
    
    const { socket } = this.props;
    socket.on("userPetsInformationUpdated", () => {
      this.loadAliveUserPets();
    });
  }
  
  render() {
    const { loading, loadingError, aliveUserPets } = this.state;
    
    const petArenaCards = this.compilePetsIntoPetArenaCardsForChoosing(aliveUserPets);
    
    if (loadingError) {
      return(
        <div className="Playground__frame__arena">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__arena">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    
    return(
      <div className="Playground__frame__arena">
        <div className="topContainer">
          <button className="buttonPVP"> PVP </button>
          <button className="buttonPVE"> PVE </button>
          <p> Prepare for battle! </p>
        </div>
        
        <div className="bottomContainer">
          
          <div className="floatLeftContainter">
            <h1 className="lastArenaBattlesLogsHeader">Last 10 battles' logs:</h1>
            <div className="lastArenaBattlesLogsContainer"></div>
          </div>
          
          
          <div className="floatRightContainter">
            <h1 className="chooserOfPetForArenaBattleHeader">Choose a pet for battle:</h1>
            <div className="chooserOfPetForArenaBattleContainer">
              { petArenaCards }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Arena;