const React = require("react");
const styles = require("../styles/Playground");

const LoadingCircleSpinner = require("./loadingCircleSpinner");

const Cat = require("../pets/cat");
const Dog = require("../pets/dog");

const WATER__bottle = require("../water/bottle");
const FOOD_can = require("../food/can");

const XP_FOR_FEEDING_PET = 3;

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
      feedBtnError: null,
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
    
    if (!activeItem.position) {
      const feedBtnError = new Error("You didn't select a food");
      this.setState({ feedBtnError });
      return;
    }
    
    activeItem.domNode.classList.remove("activeFoodAndWaterCell");
    
    const item = foodAndWaterItems[activeItem.position];
    
    foodAndWaterItems.splice(activeItem.position, 1);
    
    this.setState({
      foodAndWaterItems: foodAndWaterItems,
      showGetFoodAndWaterInformation: false,
      activeItem: {
        position: null,
        domNode: null
      }
    });
    
    const data = {
      item: item,
      pet: pet
    }
    
    try {
      const response = await fetch("user/feed", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" }, body: JSON.stringify(data)});
      
      const nextPostRequest = await fetch("/user/xp", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" },  body: JSON.stringify({ xp: XP_FOR_FEEDING_PET}) });
    }
    catch(error) {
      this.setState({
        error
      });
    }
  }
  
  setActiveItem(event, position) {
    const { activeItem, foodAndWaterItems } = this.state;
    
    this.setState({ 
      feedBtnError: null
    });
    
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
    const { error, foodPetWillGet, waterPetWillGet, showGetFoodAndWaterInformation, foodAndWaterItems, loading, loadingError, feedBtnError } = this.state;
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
            <div className="petInterface--specialist"> Specialisation <span className="specialisationSpan">{ pet.specialist }</span> </div>
            <div className="petInterface--sex"> Gender <span className="genderSpan">{ genderSymbol }</span> </div>
            <div className="petInterface--rarity"> Rarity <span className="raritySpan">{ pet.rarity.label }</span> </div>
          </div>
          
          <div className="petInterfaceROW--second"> 
            <div className="petInterface--defense"> Defense <span className="defenseSpan">{ pet.defense }</span> </div>
            <div className="petInterface--attack"> Attack <span className="attackSpan">{ pet.attack }</span>  </div>
            <div className="petInterface--happinessPoints"> Happiness <span className="happinessSpan"> <p>{`${pet.happinessPoints}/20`}</p> <div style={{ width: (pet.happinessPoints/20)*100+"px" }}></div> </span> </div>
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
              { feedBtnError && <p> { feedBtnError.message } </p> }
              <button onClick={ this.feed }> feed </button>
            </div>
          </div>
          
          <button onClick={ toggleShowPetInterfaceModal } className="backButton" > Back </button>
        </div>
      </div>
    );
  }
}

module.exports = PetInterfaceModal;