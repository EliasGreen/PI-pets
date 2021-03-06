const React = require("react");
const styles = require("../../../styles/Playground");

const BoxPI = require("../../../boxes/PI");
const generateNewPet = require("../../../functions/generateNewPet");

const Cat = require("../../../pets/cat");
const Dog = require("../../../pets/dog");

const XP_FOR_OPENING_BOX = 80;

class BoxOpenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingError: null,
      loading: false,
      currentPickedBox: null,
      dropFromBox: null,
      data: {}
    }
    
    this.getCurrentPickedBox = this.getCurrentPickedBox.bind(this);
    this.openBox = this.openBox.bind(this);
  }
  
  async openBox() {
    this.setState({
      loading: false
    });
    
    const { currentPickedBoxName, deleteUsedKeyAndBoxFromInventory, currentPickedKeyPosition, currentPickedBoxPosition, updateInformationAboutUser, buttonClickSound} = this.props;
    
    buttonClickSound.currentTime = 0;
    buttonClickSound.play();
    
    let data = {
      currentPickedKeyPosition: currentPickedKeyPosition,
      currentPickedBoxPosition: currentPickedBoxPosition
    };
    switch (currentPickedBoxName) {
      case "BoxPI":
        const newPetNickname = document.getElementById("petNameInput").value || "PetName";
        data.drop = generateNewPet(newPetNickname);
        this.setState({
          dropFromBox: data.drop
        });
        break;
      default:
        throw new Error("Unknown currentPickedBoxName property");
    }
    
    deleteUsedKeyAndBoxFromInventory();
    
    try {
      const postRequest = await fetch("/user/open-box", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" },  body: JSON.stringify(data) });
      
      const nextPostRequest = await fetch("/user/xp", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" },  body: JSON.stringify({ xp: XP_FOR_OPENING_BOX}) });
      
      //updateInformationAboutUser();
      
      this.setState({
        loading: false,
        data: data
      });
    } 
    catch(loadingError) {
      this.setState({
        loadingError,
        loading: false
      });
    }
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
              <input type="text" id="petNameInput" placeholder="Kitty-pitty" maxLength="10" required/>
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
    const { currentPickedBox, dropFromBox } = this.state;
    
    if (dropFromBox) {
      let constructedDropFromBox = null;
      if (dropFromBox.petColors) {
        const petComponents = {
          "Cat": Cat,
          "Dog": Dog
        };
        
        const PetComponent = petComponents[dropFromBox.type];
        constructedDropFromBox = <PetComponent pet={dropFromBox} opacity={1} inModal={true} showMode={true}/>
      }
      
      return(
        <div className="Playground__frames__BoxOpenModal">
          <div className="Playground__frames__BoxOpenModal__innerContent">
             <h1> From this box you got this! </h1>
             <div className="constructedDropFromBoxContainer"> { constructedDropFromBox } </div>
            <button onClick={ toggleShowBoxOpenModal }> Back </button> 
          </div>
        </div>
      );
    }
    
    return(
      <div className="Playground__frames__BoxOpenModal">
        <div className="Playground__frames__BoxOpenModal__innerContent">
           <h1> You are going to open this box </h1>
           { currentPickedBox }
          <button onClick= { this.openBox }> Open </button> 
          <button onClick={ toggleShowBoxOpenModal }> Cancel </button> 
        </div>
      </div>
    );
  }
}

module.exports = BoxOpenModal;