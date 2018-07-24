const React = require("react");
const styles = require("../../../styles/Playground");

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    let inventoryCells = [];
    for(let i = 0; i < 30; i++) {
      inventoryCells.push(<div className="inventoryCell">cell</div>);
    }
    return(
      <div className="Playground__frame__inventory">
        {inventoryCells}
      </div>
    );
  }
}

module.exports = Inventory;