const React = require("react");
const styles = require("../../../styles/Playground");

const KeyPI = require("../../../keys/PI");
const BoxPI = require("../../../boxes/PI");

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      loading: false,
      loadingError: null
    }
    this.getDataFromUserInventory = this.getDataFromUserInventory.bind(this);
    this.grabKey = this.grabKey.bind(this);
  }
  
  grabKey(ev) {
    console.log(ev);
  }
  
  async getDataFromUserInventory() {
    this.setState({
      loading: true 
    });
   
    try {
      const response = await fetch("/user/inventory", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        inventory: result.inventory,
        loading: false
      });
    } 
    catch(loadingError) {
      this.setState({
        loadingError,
        loading: false
      });
    }
  }
  
  componentDidMount() {
    this.getDataFromUserInventory();
  }
  
  render() {
    const { inventory, loading, loadingError} = this.state;
    let error = null;
    
    if (loadingError) {
      return(
        <div className="Playground__frame__inventory">
          loadingError
        </div>
      );
    }
    
     if (loading) {
      return(
        <div className="Playground__frame__inventory">
          loading...
        </div>
      );
    }
    
    let inventoryCells = [];
    for (let i = 0; i < 25; i++) {
      if (inventory[i]) {
        switch (inventory[i]["type"]) {
          case "PIbox":
            inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><BoxPI key={`box#${i}`}/></div>);
            break;
          case "PIkey":
            inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><KeyPI key={`key#${i}`}/></div>);
            break;
          default:
            error = "Unexpected error in switch statement";
       }   
     }
     else {
        inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}></div>);
      }
    }
    
    if (error) {
      return(
        <div className="Playground__frame__inventory">
          { error }
        </div>
      );
    }
    
    if (loadingError) {
      return(
        <div className="Playground__frame__inventory">
          loadingError
        </div>
      );
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__inventory">
          loading...
        </div>
      );
    }
    
    return(
      <div className="Playground__frame__inventory">
        {inventoryCells}
      </div>
    );
  }
}

module.exports = Inventory;