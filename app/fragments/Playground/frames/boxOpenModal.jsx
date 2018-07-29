const React = require("react");
const styles = require("../../../styles/Playground");

const BoxPI = require("../../../boxes/PI");

class BoxOpenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDataForServer: {},
      deleteDataForServer: {},
      currentPickedBox: null
    }
    
    this.getCurrentPickedBox = this.getCurrentPickedBox.bind(this);
    this.openBox = this.openBox.bind(this);
  }
  
  async openBox() {
    const { currentPickedBoxName } = this.props;
    let data = {};
    switch (currentPickedBoxName) {
      case "BoxPI":
        data.pet = "dsfdf";
        break;
      default:
        throw new Error("Unknown currentPickedBoxName property");
    }
    
    //TODO [SEND REQUEST]
  }
  
  getCurrentPickedBox(currentPickedBoxName) {
    switch (currentPickedBoxName) {
      case "BoxPI":
        return (
          <div className="boxContainer">
            <BoxPI />
            <p> You will get a random PI-pet from it </p>
            <div className="inputContainer">
              <label htmlFor="petNameInput"> Type in a name of your future PI-pet </label>
              <input type="text" id="petNameInput" placeholder="Kitty-pitty" maxlength="10"/>
            </div>
          </div>
        );
      default:
        throw new Error("Unknown currentPickedBoxName property");
    }
  }
  
  componentDidMount() {
    const { currentPickedBoxName } = this.props;
    const currentPickedBox = this.getCurrentPickedBox(currentPickedBoxName);
    
    this.setState({ currentPickedBox });
  }
  
  render() {
    const { toggleShowBoxOpenModal } = this.props;
    const { currentPickedBox } = this.state;
    
    return(
      <div className="Playground__frames__BoxOpenModal">
        <div className="Playground__frames__BoxOpenModal__innerContent">
           <h1> You are going to open this box </h1>
           { currentPickedBox }
          <button> Open </button> 
          <button onClick={ toggleShowBoxOpenModal }> Cancel </button> 
        </div>
      </div>
    );
  }
}

module.exports = BoxOpenModal;