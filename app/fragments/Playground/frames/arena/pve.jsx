const React = require("react");
const styles = require("../../../../styles/Playground");

const generateNewPet =  require("../../../../functions/generateNewPet");
const generatePetComponentByItsType =  require("../../../../functions/generatePetComponentByItsType");

class ArenaPVE extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      petBOT: generateNewPet("bot")
    } 
  }
  
  render() {
    const { petBOT } = this.state;
    const PetBOTComponent = generatePetComponentByItsType(petBOT.type);
    
    return(
      <div className="ArenaPVEcontainer">
        PVE
        <PetBOTComponent pet={petBOT} showMode={true} />
      </div>
    );
  }
}

module.exports = ArenaPVE;