const React = require("react");
const styles = require("../../../../styles/Playground");

const Cat = require("../../../../pets/cat");
const Dog = require("../../../../pets/dog");

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

module.exports = PetArenaCard;