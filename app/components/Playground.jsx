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
      currentFrame: "Pets"
    }
    
    this.changeCurrentFrame = this.changeCurrentFrame.bind(this);
  }
  
  changeCurrentFrame(newCurrentFrame) {
    this.setState({
      currentFrame: newCurrentFrame
    });
  }
  
  render() {
    const { currentFrame } = this.state;
    return (
      <div className="Playground__body">
        <Frame currentFrame={ currentFrame }/>
        <UserInformationBlock changeCurrentFrameFunction={ this.changeCurrentFrame }/>
      </div>
    );
  }
};

module.exports = Playground;