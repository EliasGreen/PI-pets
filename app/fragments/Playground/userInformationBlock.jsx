const React = require("react");
const styles = require("../../styles/Playground");

class UserInformationBlock extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      avatarImgSrc: "",
      username: "",
      coins: 0,
      petsAmount: 0,
      error: null,
      loading: false
    }
    
    this.getInformationAboutUser = this.getInformationAboutUser.bind(this);
  }
  
 async getInformationAboutUser() {
    this.setState({
      loading: true 
    });
   
    try {
      const response = await fetch("/user/information", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      console.log(result);
      
      this.setState({
        loading: false
      });
    } 
    catch(error) {
      this.setState({
        error,
        loading: false
      });
    }
  }
  
  componentDidMount() {
    this.getInformationAboutUser();
  }
  
  render() {
    const { avatarImgSrc, username, coins, petsAmount, error, loading } = this.state;
    
    if(error) {
      return(
        <div className="Playground__userInformationBlock">
          ERROR
        </div>
      );
    }
    
    if(loading) {
      return(
        <div className="Playground__userInformationBlock">
          loading...
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
          <button className="buttonPlaygroundFrame">Pets Polygon</button>
          <button className="buttonIngameShop">Ingame Shop</button>
          <button className="buttonWorldMarket">World Market</button>
          <button className="buttonUsersTop">Users TOP</button>
        </div>
      </div>
    );
  }
}

module.exports = UserInformationBlock;