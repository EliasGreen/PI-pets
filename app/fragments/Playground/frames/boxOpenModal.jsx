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
  }
  
  getCurrentPickedBox(currentPickedBoxName) {
    switch (currentPickedBoxName) {
      case "BoxPI":
        return (
          <div>
            <BoxPI />
            <p> You will get a random PI-pet from it </p>
            <label htmlFor="petNameInput"> Type in a name of your future PI-pet </label>
            <input type="text" id="petNameInput" placeholder="Kitty-pitty"/>
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