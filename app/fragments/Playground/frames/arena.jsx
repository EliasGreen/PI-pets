const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const PetArenaCard = require("./arena/petArenaCard");

const ArenaPVE = require("./arena/pve");
const ArenaPVP = require("./arena/pvp");

const TopContainer = require("./arena/topContainer");
const BottomContainer = require("./arena/bottomContainer");

class Arena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      choosingError: null,
      chosenPetForBattleID: null,
      chosenPetCardDOMElement: null,
      activePetNameDOMelement: null,
      reportsAboutLastBattles: <LoadingCircleSpinner target={ "arenaReports" }/>,
      aliveUserPets: null,
      currentArenaFRAME: "DEFAULT"
    }
    
    this.choosePetForBattle = this.choosePetForBattle.bind(this);
    this.rechoosePetForBattle = this.rechoosePetForBattle.bind(this);
    this.loadAliveUserPets = this.loadAliveUserPets.bind(this);
    this.compilePetsIntoPetArenaCardsForChoosing = this.compilePetsIntoPetArenaCardsForChoosing.bind(this);
    this.changeCurrentArenaFRAME = this.changeCurrentArenaFRAME.bind(this);
  }
  
  async changeCurrentArenaFRAME(frameNAME) {
    const { chosenPetForBattleID } = this.state;
    
    if (chosenPetForBattleID) {
      const data = { petID: chosenPetForBattleID };
      try {
        const response = await fetch(
          "user/check/pet/alive",
          { method: "post",
            credentials: "include",
            headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
          body: JSON.stringify(data)});
      
        if(response.ok) {
          this.setState((prevState, props) => {
            return {
              currentArenaFRAME: frameNAME
            }
          });
        }
        else {
          throw new Error(response.status);
        }
      }
      catch(error) {
        if(error.message === "421") {
            this.setState((prevState, props) => {
              return {
                choosingError: "chosen pet is dead!"
              }
            });
          }
        else {
          this.setState((prevState, props) => {
            return {
              choosingError: "connection problem - try later again"
            }
          });
        }
      }
    }
    else {
      this.setState((prevState, props) => {
        return {
          choosingError: "you didn't choose a pet for battle!"
        }
      });
    }
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

    this.setState((prevState, props) => {
      return {
        chosenPetForBattleID: petID,
        activePetNameDOMelement: newActivePetNameDOMelement,
        chosenPetCardDOMElement: newChosenPetCard,
        choosingError: null
      }
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
    const { loading, loadingError, aliveUserPets, currentArenaFRAME, chosenPetForBattleID, choosingError } = this.state;
    
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
    
    if (currentArenaFRAME === "DEFAULT") {
      return(
        <div className="Playground__frame__arena">
          <TopContainer 
            choosingError={ choosingError }
            changeCurrentArenaFRAME={ this.changeCurrentArenaFRAME }/>
          <BottomContainer 
            petArenaCards= { petArenaCards } />
        </div>
      );      
    }
    
    if (currentArenaFRAME === "PVE") {
      return(
        <div className="Playground__frame__arena">
          <ArenaPVE chosenPetForBattleID={ chosenPetForBattleID }/>
        </div>
      );      
    }
    
    if (currentArenaFRAME === "PVP") {
      return(
        <div className="Playground__frame__arena">
          <ArenaPVP />
        </div>
      );      
    }    
  }
}

module.exports = Arena;