const React = require("react");
const Link = require("react-router-dom").Link
const styles = require("../styles/IndexPage");

const Header = require("../fragments/IndexPage/header");
const InformationBlock = require("../fragments/IndexPage/informationBlock");
const Slider = require("../fragments/IndexPage/slider");
const RegisterModal = require("../fragments/IndexPage/registerModal");
const LoginModal = require("../fragments/IndexPage/loginModal");
const UserCountContainer = require("../fragments/IndexPage/userCountContainer");
const ButtonsBlock = require("../fragments/IndexPage/buttonsBlock");

/* 
  @name: IndexPage [page/AI component]
  @dest: first page that user will see when visited site
  @UX:
  - 1) - Header with Logo [just information]
  - 2) - Text-block with information about the game
  - 3) - Img-slider with game-screens and three dots for navigation
  - 4) - Register button with login one below
  - 5) - Visual Div-block
  - 6) - UserCountContainer that shows total count of users and online users count
*/

class IndexPage extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      showRegisterModal: false,
      showLoginModal: false,
      usersCount: {
        total: 0,
        online: 0
      }
    }
    
    this.toggleBooleanVariableFromState = this.toggleBooleanVariableFromState.bind(this);
    this.fetchUsersCount = this.fetchUsersCount.bind(this);
  }
  
  toggleBooleanVariableFromState(variable) {
    this.setState({
         [variable]: !this.state[variable]
      });
  }
  
  async fetchUsersCount() {
    const options = { 
      method: "get", 
      credentials: "include",
      headers: { "Content-Type": "application/json", "Accept":"application/json" }
    };
    
    try {
      const response = await fetch("user/count", options);
      const usersCount = await response.json();
      
      this.setState({ usersCount });
    }
    catch (unknownError) {
      this.setState({
        users: {
          total: "ERROR_CANNOT_GET_DATA_FROM_SERVER",
          online: "ERROR_CANNOT_GET_DATA_FROM_SERVER"
        }
      });
    }
  }
  
  async componentDidMount() {
    await this.fetchUsersCount();
  }
  
  render() {
    const {showRegisterModal, showLoginModal, usersCount} = this.state;
    return (
      <div className="IndexPage__body">
        <Header />
        
        <InformationBlock />
        <div className="divBlock"></div>
        <Slider />
        
        <ButtonsBlock toggleBooleanVariableFromState={ this.toggleBooleanVariableFromState } />
        
        <UserCountContainer usersCount={ usersCount } />
        
        {showRegisterModal && <RegisterModal toggleFunctionFromParent={ () => { this.toggleBooleanVariableFromState("showRegisterModal") } } />}
        {showLoginModal && <LoginModal toggleFunctionFromParent={ () => { this.toggleBooleanVariableFromState("showLoginModal") } } />}
      </div>
    );
  }
};

module.exports = IndexPage;