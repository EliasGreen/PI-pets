const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const KeyPI = require("../../../keys/PI");
const BoxPI = require("../../../boxes/PI");

const WATER__bottle = require("../../../water/bottle");
const FOOD__can = require("../../../food/can");

class IngameShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      error: null,
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
        <div className="ingameShopItem">
          <KeyPI inShop={ true } />
        </div>
        <p className="descriptionIngameShopItem">
          1000 coins || 10 axioms
        </p>
        <button className="buyIngameShopItemButton" onClick={ (event) => { this.buy(event, "KeyPI") } }> buy </button>
      </div>,
      <div className="ingameShopCell" key="BoxPI">
        <div className="ingameShopItem">
         <BoxPI inShop={ true } />
        </div>
        <p className="descriptionIngameShopItem">
          500 coins || 8 axioms
        </p>
        <button className="buyIngameShopItemButton" onClick={ (event) => { this.buy(event, "BoxPI") } }> buy </button>
      </div>
    ];
    
    this.foodAndWater = [
      <div className="ingameShopCell" key="FOOD__can">
        <div className="ingameShopItem">
         <FOOD__can inShop={ true } />
        </div>
        <p className="descriptionIngameShopItem">
          37 coins || 1 axioms
        </p>
        <button className="buyIngameShopItemButton" onClick={ (event) => { this.buy(event, "FOOD__can") } }> buy </button>
      </div>,
      <div className="ingameShopCell" key="WATER__bottle">
        <div className="ingameShopItem">
         <WATER__bottle inShop={ true } />
        </div>
        <p className="descriptionIngameShopItem">
          26 coins || 1 axioms
        </p>
        <button className="buyIngameShopItemButton" onClick={ (event) => { this.buy(event, "WATER__bottle") } }> buy </button>
      </div>
    ];
    
    this.changeCurrentIngameShopInteractionArea = this.changeCurrentIngameShopInteractionArea.bind(this);
    this.changePayWith = this.changePayWith.bind(this);
    this.buy = this.buy.bind(this);
    this.closeErrorAlertModal = this.closeErrorAlertModal.bind(this);
  }
  
  closeErrorAlertModal() {
    this.setState({
      error: null
    });
  }
  
  async buy(event, itemName) {
    const { payWith } = this.state;
    
    const data = {
      itemName: itemName,
      payWith: payWith.name
    };
    
    try {
      const request = await fetch(
        "user/buy/item",
        { 
          method: "post", 
          credentials: "include", 
          headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
          body: JSON.stringify(data)
        });
      
      if(!request.ok) {
        throw new Error(request.status);
      }
    }
    catch(error) {
      if (error.message == 498) {
        error.message = `You don't have enough ${ payWith.name } to buy it`;
        this.setState({
          error
        });
      }
      else if (error.message == 499) {
        error.message = `You don't have a free inventory cell to buy it`;
        this.setState({
          error
        });
      }
      else {
        throw new Error(error.message);
      }         
    }
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
    const { loading, loadingError, currentIngameShopInteractionArea, error } = this.state;
    
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
        
        { 
          error &&
          <div className="errorAlertModal">
            <div>
              { error.message }
              <button onClick={ this.closeErrorAlertModal }> close </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

module.exports = IngameShop;