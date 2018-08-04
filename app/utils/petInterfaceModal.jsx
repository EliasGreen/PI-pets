const React = require("react");
const styles = require("../styles/Playground");

const Cat = require("../pets/cat");
const Dog = require("../pets/dog");

class PetInterfaceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    
  }
  render() {
    const { pet, toggleShowPetInterfaceModal } = this.props;
    
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
          <div className="petInterface--specialist"> { `Specialisation: ${pet.specialist}` } </div>
          <div className="petInterface--sex"> { `Gender :${genderSymbol}` } </div>
          <div className="petInterface--rarity"> { `Rarity :${pet.rarity.label}` } </div>
          <div className="petInterface--defense"> { `Defense :${pet.defense}` } </div>
          <div className="petInterface--attack"> { `Attack :${pet.attack}` } </div>
          <div className="petInterface--happinessPoints"> { `Happiness :${pet.happinessPoints}` } </div>
          <div className="petInterface--hitPoints"> { `HitPoints :${pet.hitPoints}` } </div>
          <div className="petInterface--waterPoints"> { `Water-bar :${pet.waterPoints}` } </div>
          <div className="petInterface--foodPoints"> { `Food-bar :${pet.foodPoints}` } </div>
          <div className="petInterface--birthdate"> { `Birthdate :${pet.birthdate}` } </div>
          <button onClick={ toggleShowPetInterfaceModal }> Back </button>
        </div>
      </div>
    );
  }
}

module.exports = PetInterfaceModal;