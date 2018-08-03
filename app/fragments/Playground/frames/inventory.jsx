const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const KeyPI = require("../../../keys/PI");
const BoxPI = require("../../../boxes/PI");

const BoxOpenModal = require("./boxOpenModal");

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      loading: false,
      loadingError: null,
      currentPickedKey: { name: "", position: -1 },
      currentPickedBox: { name: "", position: -1 },
      showBoxOpenModal: false
    }
    this.getDataFromUserInventory = this.getDataFromUserInventory.bind(this);
    this.setCurrentPickedKeyNameAndPosition = this.setCurrentPickedKeyNameAndPosition.bind(this);
    this.setCurrentPickedBoxNameAndPosition = this.setCurrentPickedBoxNameAndPosition.bind(this);
    this.toggleShowBoxOpenModal = this.toggleShowBoxOpenModal.bind(this);
    this.checkKeyFitBox = this.checkKeyFitBox.bind(this);
    this.deleteUsedKeyAndBoxFromInventory = this.deleteUsedKeyAndBoxFromInventory.bind(this);
  }
  
  deleteUsedKeyAndBoxFromInventory() {
    const { currentPickedKey, currentPickedBox, inventory } = this.state;
    const newInventory = (inventory.splice(currentPickedKey.position, 1)).splice(currentPickedBox.position, 1);
    
    this.setState({
     inventory: newInventory
   });
  }
  
  checkKeyFitBox() {
    const { currentPickedKey, currentPickedBox } = this.state;
    switch (currentPickedKey.name) {
      case "KeyPI":
        return currentPickedBox.name == "BoxPI" ? true : false;
      default: 
        throw Error("Unexpecred key name");
    }
  }
  
  toggleShowBoxOpenModal() {
   this.setState({
     showBoxOpenModal: !this.state.showBoxOpenModal
   });
  }
  
  setCurrentPickedKeyNameAndPosition(name, position) {
    this.setState({ 
      currentPickedKey: {
        name: name,
        position: position
      }
    });
  }
  
  setCurrentPickedBoxNameAndPosition(name, position) {
    this.setState({ 
      currentPickedBox: {
        name: name,
        position: position
      }
    });
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
    const { inventory, loading, loadingError, showBoxOpenModal, currentPickedBox, currentPickedKey} = this.state;
    const { updateInformationAboutUser } = this.props;
    let error = null;
    
    if (loadingError) {
      return(
        <div className="Playground__frame__inventory">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );
    }
    
     if (loading) {
      return(
        <div className="Playground__frame__inventory">
          <LoadingCircleSpinner />
        </div>
      );
    }
    
    let inventoryCells = [];
    for (let i = 0; i < 25; i++) {
      if (inventory[i]) {
        switch (inventory[i]["type"]) {
          case "PIbox":
            inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><BoxPI key={`box#${i}`} setCurrentPickedBoxNameAndPosition={ () => { this.setCurrentPickedBoxNameAndPosition("BoxPI", i) } } toggleShowBoxOpenModal={ this.toggleShowBoxOpenModal }/></div>);
            break;
          case "PIkey":
            inventoryCells.push(<div className="inventoryCell" key={`cell#${i}`}><KeyPI key={`key#${i}`} setCurrentPickedKeyNameAndPosition={ () => { this.setCurrentPickedKeyNameAndPosition("KeyPI", i) } }/></div>);
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
        { inventoryCells }
        { showBoxOpenModal && this.checkKeyFitBox() && 
          <BoxOpenModal 
            toggleShowBoxOpenModal={ this.toggleShowBoxOpenModal } 
            currentPickedBoxName={ currentPickedBox.name } 
            deleteUsedKeyAndBoxFromInventory={ this.deleteUsedKeyAndBoxFromInventory } 
            currentPickedKeyPosition={ currentPickedKey.position } 
            currentPickedBoxPosition={ currentPickedBox.position }
            updateInformationAboutUser = { updateInformationAboutUser }/> }
      </div>
    );
  }
}

module.exports = Inventory;