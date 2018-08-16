const React = require("react");
const styles = require("../../styles/Playground");

const Pets = require("./frames/pets");
const Inventory = require("./frames/inventory");
const IngameShop = require("./frames/ingameShop");
const WorldMarket = require("./frames/worldMarket");
const UsersTOP = require("./frames/usersTOP");

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { updateInformationAboutUser, socket, switchButtonSound, buttonClickSound } = this.props;
    
    const frames = {
      Pets: Pets,
      Inventory: Inventory,
      IngameShop: IngameShop,
      WorldMarket: WorldMarket,
      UsersTOP: UsersTOP
    };
    
    const CurrentFrame = frames[`${this.props.currentFrame}`];
    
    return(
      <div className="Playground__frame">
        <CurrentFrame updateInformationAboutUser={ updateInformationAboutUser } socket={ socket } switchButtonSound={ switchButtonSound } buttonClickSound={ buttonClickSound }/>
      </div>
    );
  }
}
module.exports = Frame;