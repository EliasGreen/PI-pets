const React = require("react");
const Link = require("react-router-dom").Link
const styles = require("../styles/Playground");

const io = require("socket.io-client");

const Frame = require("../fragments/Playground/frame");
const UserInformationBlock = require("../fragments/Playground/userInformationBlock");

/* 
  @name: Playgeound [page/AI component]
  @dest: main page for loged in user where he can play with his pets/ see account statistics/ navigate to other pages
  @UX:
  - 1) - playground frame that holds all pets
  - 2) - user information block with nav-buttons
*/

class Playground extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: "Pets",
      username: "",
      userID: null,
      coins: 0,
      axioms: 0,
      xp: 0,
      petsAmount: 0,
      loadingError: null,
      loading: false
    }
    
    this.switchButtonSound = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2Ftoggle%20switch.mp3?1534431700846");
    this.switchButtonSound.volume = 0.3;
    this.buttonClickSound = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2Fbuttonclick.mp3?1534432950718");
    this.buttonClickSound.volume = 0.3;
    this.mainGameTheme = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FFeelin%20Good.mp3?1534430536613");
    this.mainGameTheme.loop = true;
    this.mainGameTheme.volume = 0.1;
    
    this.socket = io.connect();
    
    this.changeCurrentFrame = this.changeCurrentFrame.bind(this);
    this.getInformationAboutUser = this.getInformationAboutUser.bind(this);
    this.connectUserToServerWithSocket = this.connectUserToServerWithSocket.bind(this);
    this.initializeUser = this.initializeUser.bind(this);
  }
  

  
  async connectUserToServerWithSocket() {
    this.socket.emit("addNewUsersSocket", this.state.userID);
  }
  
  async getInformationAboutUser(updatingBehindTheScene) {
    if (!updatingBehindTheScene) {
      this.setState({
        loading: true 
      });
    }
   
    try {
      const response = await fetch("/user/information", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        username: result.username,
        userID: result.userID,
        coins: result.coins,
        axioms: result.axioms,
        petsAmount: result.petsAmount,
        xp: result.xp,
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
  
  async initializeUser() {
    await this.getInformationAboutUser();
    await this.connectUserToServerWithSocket();
  }
  
  changeCurrentFrame(newCurrentFrame) {
    this.switchButtonSound.currentTime = 0;
    this.switchButtonSound.play();
    
    this.setState({
      currentFrame: newCurrentFrame
    });
  }
  
  componentDidMount() {
    this.initializeUser();

    this.mainGameTheme.play();
    
    this.socket.on("userInformationUpdated", () => {
      this.getInformationAboutUser(true);
    });
  }
  
  render() {
    const { currentFrame, username, coins, petsAmount, loadingError, loading, xp, axioms } = this.state;
    
    return (
      <div className="Playground__body">
        <Frame 
          currentFrame={ currentFrame } 
          updateInformationAboutUser={ this.getInformationAboutUser } 
          socket={ this.socket  } 
          switchButtonSound={ this.switchButtonSound } 
          buttonClickSound={ this.buttonClickSound }
          />
        <UserInformationBlock 
          changeCurrentFrameFunction={ this.changeCurrentFrame } 
          username={ username }
          coins={ coins }
          loadingError={ loadingError }
          loading={ loading }
          petsAmount={ petsAmount }
          xp={ xp }
          axioms= { axioms }
          />
      </div>
    );
  }
};

module.exports = Playground;