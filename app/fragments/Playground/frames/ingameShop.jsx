const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const KeyPI = require("../../../keys/PI");
const BoxPI = require("../../../boxes/PI");

const WATER__bottle = require("../../../water/bottle");
const FOOD_can = require("../../../food/can");

class IngameShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      payWith: {
        name: "coins",
        domNode: null
      },
      currentIngameShopInteractionArea: {
        name: "keysAndBoxes",
        domNode: null
      }
    }
    
    this.keysAndBoxes = [
      <div className="ingameShopCell" key="KeyPI">
        <KeyPI inShop={ true } />
      </div>,
      <div className="ingameShopCell" key="BoxPI">
        <BoxPI inShop={ true } />
      </div>
    ];
    
    this.foodAndWater = [
      <div className="ingameShopCell" key="WATER__bottle">
        <WATER__bottle />
      </div>,
      <div className="ingameShopCell" key="FOOD_can">
        <FOOD_can />
      </div>
    ];
    
    this.changeCurrentIngameShopInteractionArea = this.changeCurrentIngameShopInteractionArea.bind(this);
    this.changePayWith = this.changePayWith.bind(this);
  }
  
  changePayWith(event, newPayWithName) {
    const { payWith }  = this.state;
    
    if (payWith.domNode) {
      payWith.domNode.classList.remove("activeChoser");
    }
    else {
      document.getElementsByClassName("coinsChooser")[0].classList.remove("activeChoser");
    }
    event.currentTarget.classList.add("activeChoser");
    
    this.setState({
      payWith: {
        name: newPayWithName,
        domNode: event.currentTarget
      }
    });
  }
  
  changeCurrentIngameShopInteractionArea(event, newIngameShopInteractionAreaName) {
    const { currentIngameShopInteractionArea }  = this.state;
    
    if (currentIngameShopInteractionArea.domNode) {
      currentIngameShopInteractionArea.domNode.classList.remove("currentIngameShopInteractionArea");
    }
    else {
      document.getElementsByClassName("TAB--keysAndBoxes")[0].classList.remove("currentIngameShopInteractionArea");
    }
    event.currentTarget.classList.add("currentIngameShopInteractionArea");
    
    this.setState({
      currentIngameShopInteractionArea: {
        name: newIngameShopInteractionAreaName,
        domNode: event.currentTarget
      }
    });
  }
  
  render() {
    const { loading, loadingError, currentIngameShopInteractionArea } = this.state;
    
    if (loadingError) {
      return(
        <div className="Playground__frame__ingameShop">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__ingameShop">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    
    return(
      <div className="Playground__frame__ingameShop">
        <div className="TAB--keysAndBoxes currentIngameShopInteractionArea" onClick={ (event) => { this.changeCurrentIngameShopInteractionArea(event, "keysAndBoxes") } } > Keys and boxes </div>
        <div className="TAB--foodAndWater" onClick={ (event) => { this.changeCurrentIngameShopInteractionArea(event, "foodAndWater") } } > Food and water </div>
        
        <div className="axiomsOrCoinsChooser">
          I will pay with
          <div className="axiomsChooser" onClick={ (event) => { this.changePayWith(event, "axioms") } }> axioms </div>
          ||
          <div className="coinsChooser activeChoser" onClick={ (event) => { this.changePayWith(event, "coins") } }> coins </div>
        </div>
        
        <div className="ingameShopInteractionArea">
          { this[currentIngameShopInteractionArea.name] }
        </div>
      </div>
    );
  }
}

module.exports = IngameShop;