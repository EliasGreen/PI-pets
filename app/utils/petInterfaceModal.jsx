const React = require("react");
const styles = require("../styles/Playground");

const Cat = require("../pets/cat");
const Dog = require("../pets/dog");

const foodAndWaterCells = ({ foodAndWaterItems }) => {
  
  return(
    <div className="foodAndWaterCells">
      
    </div>
  );  
}

class PetInterfaceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      foodPetWillGet: 0,
      waterPetWillGet: 0,
      showGetFoodAndWaterInformation: false,
      foodAndWaterItems: []
    }
    this.utilizePet = this.utilizePet.bind(this);
  }
  
  async utilizePet() {
    const { pet, toggleShowPetInterfaceModal, deletePetFromPets, updateInformationAboutUser } = this.props;
    
    const data = {
      petId: pet._id
    };
    
    try {
      const response = await fetch("user/utilize-pet", 
                             { method: "post", credentials: "include", 
                              headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
                              body: JSON.stringify(data) });
    
      deletePetFromPets();
      toggleShowPetInterfaceModal();
      updateInformationAboutUser();
    }
    catch (error) {
      this.setState({ error });
    }
  }
  
  render() {
    const { error, foodPetWillGet, waterPetWillGet, showGetFoodAndWaterInformation } = this.state;
    const { pet, toggleShowPetInterfaceModal } = this.props;
    
    if (error) {
      return(
        <div className="Playground__frames__PetInterfaceModal">
          <div className="Playground__frames__PetInterfaceModal__innerContent">
            error
          </div>
        </div>
      );  
    }
    
    const petComponents = {
      "Cat": Cat,
      "Dog": Dog
    }
    
    const PetComponent = petComponents[pet.type];
    const petOpacity = pet.alive === true ? 1 : 0.4;
    
    const genderSymbol = pet.sex === "Male" ? "\u2642" : "\u2640";
    
    return(
      <div className="Playground__frames__PetInterfaceModal">
        <div className="Playground__frames__PetInterfaceModal__innerContent">
          <div className="petInterface--label"> { `${pet.type} named ${pet.nickname}` } </div>
          <div className="petInterface--petContainer"> <PetComponent pet={pet} opacity={petOpacity} showMode={ true }/> </div>
          
          <div className="petInterfaceROW--first">
            <div className="petInterface--specialist"> { `Specialisation: ${pet.specialist}` } </div>
            <div className="petInterface--sex"> { `Gender :${genderSymbol}` } </div>
            <div className="petInterface--rarity"> { `Rarity :${pet.rarity.label}` } </div>
          </div>
          
          <div className="petInterfaceROW--second"> 
            <div className="petInterface--defense"> { `Defense :${pet.defense}` } </div>
            <div className="petInterface--attack"> { `Attack :${pet.attack}` } </div>
            <div className="petInterface--happinessPoints"> { `Happiness :${pet.happinessPoints}` } </div>
          </div>
          
          <div className="petInterfaceROW--third"> 
            <div className="petInterface--hitPoints"> { `HitPoints :${pet.hitPoints}` } </div>
            <div className="petInterface--waterPoints"> { `Water-bar :${pet.waterPoints}` } </div>
            <div className="petInterface--foodPoints"> { `Food-bar :${pet.foodPoints}` } </div>
            <div className="petInterface--birthdate"> { `Birthdate :${(new Date(pet.birthdate)).toDateString()}` } </div>
            { !pet.alive && <div className="petInterface--dead"> Pet is dead: <button onClick={ this.utilizePet }> utilize </button> </div> }
          </div>
          
          <div className="feedPetBlock">
            <h3> Feed your pet: </h3>
            { showGetFoodAndWaterInformation && <p> Your pet will get { foodPetWillGet } food and { foodPetWillGet } water points </p> }
            <div className="foodsPetContainer">
              
            </div>
            <button> feed </button>
          </div>
          
          <button onClick={ toggleShowPetInterfaceModal }> Back </button>
        </div>
      </div>
    );
  }
}

module.exports = PetInterfaceModal;