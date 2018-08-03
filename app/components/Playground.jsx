const React = require("react");
const Link = require("react-router-dom").Link
const styles = require("../styles/Playground");

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
      coins: 0,
      petsAmount: 0,
      loadingError: null,
      loading: false
    }
    
    this.changeCurrentFrame = this.changeCurrentFrame.bind(this);
    this.getInformationAboutUser = this.getInformationAboutUser.bind(this);
  }
  
  async getInformationAboutUser() {
    this.setState({
      loading: true 
    });
   
    try {
      const response = await fetch("/user/information", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        username: result.username,
        coins: result.coins,
        petsAmount: result.petsAmount,
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
  
  changeCurrentFrame(newCurrentFrame) {
    this.setState({
      currentFrame: newCurrentFrame
    });
  }
  
  componentDidMount() {
    this.getInformationAboutUser();
  }
  
  render() {
    const { currentFrame, username, coins, petsAmount, loadingError, loading } = this.state;
    return (
      <div className="Playground__body">
        <Frame currentFrame={ currentFrame } updateInformationAboutUser={ this.getInformationAboutUser }/>
        <UserInformationBlock changeCurrentFrameFunction={ this.changeCurrentFrame } 
          username={ username }
          coins={ coins }
          loadingError={ loadingError }
          loading={ loading }
          petsAmount={ petsAmount }
          />
      </div>
    );
  }
};

module.exports = Playground;