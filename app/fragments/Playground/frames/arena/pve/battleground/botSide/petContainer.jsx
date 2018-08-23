const React = require("react");

const generatePetComponentByItsType =  require("../../../../../../../functions/generatePetComponentByItsType");

class PetContainer extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { Bot } = this.props;
    const BotPetComponent = generatePetComponentByItsType(Bot.pet.type);
    
    return(
     <div className="petContainer right">
        <p className="playerName">{ Bot.botname }</p>
        <div className="petComponentWrapper">
          <BotPetComponent pet={ Bot.pet } showMode={ true }/>
        </div>
        <p className="petNickname">{ Bot.pet.nickname }</p>
      </div>
    );
  }
}

module.exports = PetContainer;