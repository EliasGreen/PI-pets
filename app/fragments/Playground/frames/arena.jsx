const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const Cat = require("../../../pets/cat");
const Dog = require("../../../pets/dog");


const PetArenaCard = ({ pet, choosePetForBattle, rechoosePetForBattle }) => {
  const petComponents = {
    "Cat": Cat,
    "Dog": Dog
  }
  
  let containerForPetPropsStyle = {
    width: "120px",
    height: "90px"
  }
  
  if (pet.type === "Cat") {
    containerForPetPropsStyle = {
      width: "120pt",
      height: "90pt"
    }
  }
  
  const PetComponent = petComponents[pet.type];
  
  return(
    <div className="petArenaCard">
      <div className="containerForPet" style={ containerForPetPropsStyle }>
         <PetComponent 
           pet={pet}
           showMode={true}
         />
      </div>
      <h3 className="petName" onClick={ (event) => choosePetForBattle(event, pet._id) }>{ pet.nickname }</h3>
      <button className="chooseAnotherPetButton" onClick={ (event) => rechoosePetForBattle(event) }>choose another pet</button>
    </div>
 );    
}


class Arena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      chosenPetForBattleID: null,
      chosenPetCardDOMElement: null,
      activePetNameDOMelement: null,
      reportsAboutLastBattles: <LoadingCircleSpinner target={ "arenaReports" }/>,
      aliveUserPets: null
    }
    
    this.choosePetForBattle = this.choosePetForBattle.bind(this);
    this.rechoosePetForBattle = this.rechoosePetForBattle.bind(this);
    this.loadAliveUserPets = this.loadAliveUserPets.bind(this);
    this.compilePetsIntoPetArenaCardsForChoosing = this.compilePetsIntoPetArenaCardsForChoosing.bind(this);
  }
  
  rechoosePetForBattle(event) {
    const { activePetNameDOMelement, chosenPetCardDOMElement } = this.state;
    
    activePetNameDOMelement.classList.remove("activePetName");
    chosenPetCardDOMElement.classList.remove("chosenPetCard");
    
    const rechooseButton = event.currentTarget;
    rechooseButton.style.display = "none";
    const chooserOfPetForArenaBattleContainer = event.currentTarget.parentElement.parentElement;
    chooserOfPetForArenaBattleContainer.style.overflowY = "scroll";
    
    this.setState({
      chosenPetForBattleID: null
    });
  }
  
  choosePetForBattle(event, petID) {
    const { activePetNameDOMelement, chosenPetCardDOMElement } = this.state;
    
    const newActivePetNameDOMelement =  event.currentTarget;
    const newChosenPetCard = newActivePetNameDOMelement.parentElement;
    const chosenPetCardContainer = newChosenPetCard.parentElement;
    const chooseAnotherPetButton = newActivePetNameDOMelement.nextElementSibling;
    setTimeout(() => {
      chooseAnotherPetButton.style.display = "block";
    }, 1000);

    newActivePetNameDOMelement.classList.add("activePetName");
    newChosenPetCard.classList.add("chosenPetCard");
    chosenPetCardContainer.style.overflow = "hidden";

    this.setState({
      chosenPetForBattleID: petID,
      activePetNameDOMelement: newActivePetNameDOMelement,
      chosenPetCardDOMElement: newChosenPetCard
    });
    
    for (let i = 0; i < 2; i++) { 
      newChosenPetCard.style.top = (chosenPetCardContainer.scrollTop + 150) + "px"; 
    }
    
  }
  
  compilePetsIntoPetArenaCardsForChoosing(alivePets) {
    if (alivePets === null) {
     return <LoadingCircleSpinner target={ "arenaAlivePetsCards" }/>;
    }
    
   return alivePets.map(pet => {   
     return(
       <PetArenaCard pet={ pet } choosePetForBattle={ this.choosePetForBattle } key={ pet._id } rechoosePetForBattle={ this.rechoosePetForBattle }/>
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