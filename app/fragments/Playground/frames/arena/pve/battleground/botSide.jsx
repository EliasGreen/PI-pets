const React = require("react");

const generatePetComponentByItsType =  require("../../../../../../functions/generatePetComponentByItsType");

const Dots = require("./botSide/dots");
const PetContainer = require("./botSide/petContainer");

class BotSide extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { Bot, styleForBotName, botPoints, botChosenPoint } = this.props;
    
    return(
      <div className="botSide">
        <Dots 
          botPoints={ botPoints }
          botChosenPoint={ botChosenPoint } />
        <PetContainer 
          Bot={ Bot } 
          styleForBotName={ styleForBotName } />
      </div>
    );
  }
}

module.exports = BotSide;