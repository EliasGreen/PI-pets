const React = require("react");
const styles = require("../styles/Playground");

const LoadingCircleSpinner = require("./loadingCircleSpinner");

const Cat = require("../pets/cat");
const Dog = require("../pets/dog");

const WATER__bottle = require("../water/bottle");
const FOOD_can = require("../food/can");

const FoodAndWaterCells = (props) => {
  const { foodAndWaterItems, loading, loadingError, setActiveItem } = props;
  
  if (loading) {
    return (
      <div className="foodAndWaterCells">
        <LoadingCircleSpinner target={ "foodAndWaterCells" }/>
      </div>
    );  
  }
  
  if (loadingError) {
    return (
      <div className="foodAndWaterCells">
        { "Error: loading has failed - please, try again." }
      </div>
    );  
  }
  
  let inventoryCells = [];
  
  let lengthOfIteration = 6;
  
  if (foodAndWaterItems.length > 6) {
    lengthOfIteration = foodAndWaterItems.length + (6 - (foodAndWaterItems.length % 6));
  }
  
   for (let i = 0; i < lengthOfIteration; i++) {
      if (foodAndWaterItems[i]) {
        switch (foodAndWaterItems[i]["type"]) {
          case "FOOD__can":
            inventoryCells.push(<div className="foodAndWaterCell"
                                  key={`cell#${i}`} 
                                  onClick={ (event) => { setActiveItem(event, i) } }
                                  >
                                  <FOOD_can key={`food#${i}`} />
                                </div>);
            break;
          case "WATER__bottle":
            inventoryCells.push(<div className="foodAndWaterCell"
                                  key={`cell#${i}`} 
                                  onClick={ (event) => { setActiveItem(event, i) } } >
                                  <WATER__bottle key={`water#${i}`}/>
                                </div>);
            break;
          default:
            throw new Error("Unexpected error in switch statement");
       }   
     }
     else {
        inventoryCells.push(<div className="inventoryCell"
                              key={`cell#${i}`} >
                            </div>);
      }
    }
  
  return(
    <div className="foodAndWaterCells">
      { inventoryCells }
    </div>
  );  
}

class PetInterfaceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      foodPetWillGet: 0,
      waterPetWillGet: 0,
      showGetFoodAndWaterInformation: false,
      foodAndWaterItems: [],
      loading: null,
      loadingError: null,
      activeItem: {
        position: null,
        domNode: null
      }
    }
    
    this.utilizePet = this.utilizePet.bind(this);
    this.getFoodAndWaterItemsFromUserInventory = this.getFoodAndWaterItemsFromUserInventory.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.feed = this.feed.bind(this);
  }
  
  async feed() {
    const { foodAndWaterItems, activeItem } = this.state;
    const { pet } = this.props;
    
    const item = foodAndWaterItems[activeItem.position];
    
    foodAndWaterItems.splice(activeItem.position, 1);
    
    this.setState({
      foodAndWaterItems: foodAndWaterItems,
      showGetFoodAndWaterInformation: false
    });
    
    const data = {
      item: item,
      pet: pet
    }
    
    try {
      const response = await fetch("user/feed", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" }, body: JSON.stringify(data)});
    }
    catch(error) {
      this.setState({
        error
      });
    }
  }
  
  setActiveItem(event, position) {
    const { activeItem, foodAndWaterItems } = this.state;
    
    if (activeItem.domNode) {
      activeItem.domNode.classList.remove("activeFoodAndWaterCell"); 
    }
    
    event.currentTarget.classList.add("activeFoodAndWaterCell");
    
    this.setState({
      activeItem: {
        position: position,
        domNode: event.currentTarget
      },
      foodPetWillGet: foodAndWaterItems[position].foodValue,
      waterPetWillGet: foodAndWaterItems[position].waterValue,
      showGetFoodAndWaterInformation: true
    });
  }
  
  async utilizePet() {
    const { pet, toggleShowPetInterfaceModal, deletePetFromPets, updateInformationAboutUser } = this.props;
    
    const data = {
      petId: pet._id
    };
    
    try {
      const response = await fetch("user/utilize-pet", 
                             { method: "post", credentials: "include", 
                              headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
                              body: JSON.stringify(data) });
    
      deletePetFromPets();
      toggleShowPetInterfaceModal();
      updateInformationAboutUser();
    }
    catch (error) {
      this.setState({ error });
    }
  }
  
  async getFoodAndWaterItemsFromUserInventory() {
    this.setState({
      loading: true 
    });
   
    try {
      const response = await fetch("/user/supplies", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        foodAndWaterItems: result.foodAndWaterItems,
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
    this.getFoodAndWaterItemsFromUserInventory();
  }
  
  render() {
    const { error, foodPetWillGet, waterPetWillGet, showGetFoodAndWaterInformation, foodAndWaterItems, loading, loadingError } = this.state;
    const { pet, toggleShowPetInterfaceModal } = this.props;
    
    if (error) {
      return(
        <div className="Playground__frames__PetInterfaceModal">
          <div className="Playground__frames__PetInterfaceModal__innerContent">
            error
          </div>
        </div>
      );  
    }
    
    const petComponents = {
      "Cat": Cat,
      "Dog": Dog
    }
    
    const PetComponent = petComponents[pet.type];
    const petOpacity = pet.alive === true ? 1 : 0.4;
    
    const genderSymbol = pet.sex === "Male" ? "\u2642" : "\u2640";
    
    let getFoodAndWaterInformation = null;
    
    if (showGetFoodAndWaterInformation) {
      if (foodPetWillGet > 0 && waterPetWillGet > 0) {
        getFoodAndWaterInformation = <p> Your pet will get { foodPetWillGet } food and { waterPetWillGet } water points </p>;
      }
      else if (foodPetWillGet > 0) {
        getFoodAndWaterInformation = <p> Your pet will get { foodPetWillGet } food points </p>;
      }
      else {
        getFoodAndWaterInformation = <p> Your pet will get { waterPetWillGet } water points </p>;
      }
    }
    
    return(
      <div className="Playground__frames__PetInterfaceModal">
        <div className="Playground__frames__PetInterfaceModal__innerContent">
          <div className="petInterface--label"> { `${pet.type} named ${pet.nickname}` } </div>
          <div className="petInterface--petContainer"> <PetComponent pet={pet} opacity={petOpacity} showMode={ true }/> </div>
          
          <div className="petInterfaceROW--first">
            <div className="petInterface--specialist"> { `Specialisation: ${pet.specialist}` } </div>
            <div className="petInterface--sex"> { `Gender :${genderSymbol}` } </div>
            <div className="petInterface--rarity"> { `Rarity :${pet.rarity.label}` } </div>
          </div>
          
          <div className="petInterfaceROW--second"> 
            <div className="petInterface--defense"> { `Defense :${pet.defense}` } </div>
            <div className="petInterface--attack"> { `Attack :${pet.attack}` } </div>
            <div className="petInterface--happinessPoints"> { `Happiness :${pet.happinessPoints}` } </div>
          </div>
          
          <div className="petInterfaceROW--third"> 
            <div className="petInterface--hitPoints"> { `HitPoints :${pet.hitPoints}` } </div>
            <div className="petInterface--waterPoints"> { `Water-bar :${pet.waterPoints}` } </div>
            <div className="petInterface--foodPoints"> { `Food-bar :${pet.foodPoints}` } </div>
            <div className="petInterface--birthdate"> { `Birthdate :${(new Date(pet.birthdate)).toDateString()}` } </div>
            { !pet.alive && <div className="petInterface--dead"> Pet is dead: <button onClick={ this.utilizePet }> utilize </button> </div> }
          </div>
          
          <div className="feedPetBlock">
            <FoodAndWaterCells foodAndWaterItems={ foodAndWaterItems } loading={ loading } loadingError={ loadingError } setActiveItem={ this.setActiveItem }/>
            
            <div className="interactiveSubBlock">
              <h3> Feed your pet: </h3>
              { getFoodAndWaterInformation }
              <button onClick={ this.feed }> feed </button>
            </div>
          </div>
          
          <button onClick={ toggleShowPetInterfaceModal }> Back </button>
        </div>
      </div>
    );
  }
}

module.exports = PetInterfaceModal;