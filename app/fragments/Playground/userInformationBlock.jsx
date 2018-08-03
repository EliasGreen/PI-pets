
const React = require("react");
const styles = require("../../styles/Playground");

const LoadingCircleSpinner = require("../../utils/loadingCircleSpinner");

class UserInformationBlock extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      avatarImgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBRURE93_LfM_m1EGtHVwGczXh8iWAmpO9FqFW2wKE5H890eZ",
      username: "",
      coins: 0,
      petsAmount: 0,
      loadingError: null,
      loading: false,
      currentActiveButton: "buttonPlaygroundFrame",
      buttonPlaygroundFrameAdditionClass: "activeButton",
      buttonInventoryAdditionClass: "",
      buttonIngameShopAdditionClass: "",
      buttonWorldMarketAdditionClass: "",
      buttonUsersTopAdditionClass: ""
    }
    
    this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive = this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive.bind(this);
  }
  
  setPressedButtonToAnActiveClassAndOthersButtonsToInactive(targetButtonStringName) {
    const prevActiveButtonName = `${this.state.currentActiveButton}AdditionClass`;
    const currentActiveButtonName = `${targetButtonStringName}AdditionClass`;
    
    this.setState({
      [prevActiveButtonName]: "inactiveButton",
      [currentActiveButtonName]: "activeButton",
      currentActiveButton: targetButtonStringName
    });
  }
  
  
  render() {
    const { avatarImgSrc,
           buttonPlaygroundFrameAdditionClass,
           buttonInventoryAdditionClass,
           buttonIngameShopAdditionClass,
           buttonWorldMarketAdditionClass,
           buttonUsersTopAdditionClass } = this.state;
    const { changeCurrentFrameFunction,
            username,
            coins,
            petsAmount,
            loadingError,
            loading } = this.props;
    
    if (loadingError) {
      return(
        <div className="Playground__userInformationBlock">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__userInformationBlock">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    
    return(
      <div className="Playground__userInformationBlock">
        <img src={ avatarImgSrc } alt="avatar" className="userAvatarImg"></img>
        <h2 className="usernameHeading">{ username }</h2>
        <div className="userDataBlock">
          <p className="coinsUserData">Coins: { coins }</p>
          <p className="petsUserData">Pets: { petsAmount }</p>
        </div>

        <div className="navigationButtonsBlock">
          <button className={`buttonPlaygroundFrame ${buttonPlaygroundFrameAdditionClass}`} onClick={ () => { changeCurrentFrameFunction("Pets"); this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive("buttonPlaygroundFrame") } }>Pets Polygon</button>
          <button className={`buttonInventory ${buttonInventoryAdditionClass}`} onClick={ () => { changeCurrentFrameFunction("Inventory"); this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive("buttonInventory") } }>Inventory</button>
          <button className={`buttonIngameShop ${buttonIngameShopAdditionClass}`} onClick={ () => { changeCurrentFrameFunction("IngameShop"); this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive("buttonIngameShop") } }>Ingame Shop</button>
          <button className={`buttonWorldMarket ${buttonWorldMarketAdditionClass}`} onClick={ () => { changeCurrentFrameFunction("WorldMarket"); this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive("buttonWorldMarket") } }>World Market</button>
          <button className={`buttonUsersTop ${buttonUsersTopAdditionClass}`} onClick={ () => { changeCurrentFrameFunction("UsersTOP"); this.setPressedButtonToAnActiveClassAndOthersButtonsToInactive("buttonUsersTop") } }>Users TOP</button>
        </div>
      </div>
    );
  }
}

module.exports = UserInformationBlock;