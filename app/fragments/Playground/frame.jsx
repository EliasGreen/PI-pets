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
    this.state = {
      currentFrame: "Pets"
    }
  }
  
  render() {
    const frames = {
      Pets: Pets,
      Inventory: Inventory,
      IngameShop: IngameShop,
      WorldMarket: WorldMarket,
      UsersTOP: UsersTOP
    };
    const CurrentFrame = frames["Pets"];
    return(
      <div className="Playground__frame">
        <CurrentFrame />
      </div>
    );
  }
}
module.exports = Frame;