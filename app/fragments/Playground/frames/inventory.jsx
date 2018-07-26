const React = require("react");
const styles = require("../../../styles/Playground");
const KeyPI = require("../../../keys/PI");
const BoxPI = require("../../../boxes/PI");

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    let inventoryCells = [];
    for (let i = 0; i < 25; i++) {
      if (i === 1) {
        inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><BoxPI key={`box#${i}`}/></div>);
      }
      else if (i === 2) {
        inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><KeyPI key={`key#${i}`}/></div>);
      }
      else {
        inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}></div>);
      }
    }
    return(
      <div className="Playground__frame__inventory">
        {inventoryCells}
      </div>
    );
  }
}

module.exports = Inventory;