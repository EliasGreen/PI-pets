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
    const { Bot } = this.props;
    
    return(
      <div className="botSide">
        <Dots />
        <PetContainer Bot={ Bot }/>
      </div>
    );
  }
}

module.exports = BotSide;