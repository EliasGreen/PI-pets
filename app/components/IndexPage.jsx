const React = require("react");
const Link = require("react-router-dom").Link
const styles = require("../styles/IndexPage");

const Header = require("../fragments/IndexPage/header");
const InformationBlock = require("../fragments/IndexPage/informationBlock");
const Slider = require("../fragments/IndexPage/slider");
const RegisterModal = require("../fragments/IndexPage/registerModal");
const LoginModal = require("../fragments/IndexPage/loginModal");

/* 
  @name: IndexPage [page/AI component]
  @dest: first page that user will see when visited site
  @UX:
  - 1) - Header with Logo [just information]
  - 2) - Text-block with information about the game
  - 3) - Img-slider with game-screens and three dots for navigation
  - 4) - Register button with login one below
  - 5) - Visual Div-block
*/

class IndexPage extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      showRegisterModal: false,
      showLoginModal: false
    }
    
    this.toggleBooleanVariableFromState = this.toggleBooleanVariableFromState.bind(this);
  }
  
  toggleBooleanVariableFromState(variable) {
    this.setState({
         [variable]: !this.state[variable]
      });
  }
  
  render() {
    const {showRegisterModal, showLoginModal} = this.state;
    return (
      <div className="IndexPage__body">
        <Header />
        
        <InformationBlock />
        <div className="divBlock"></div>
        <Slider />
        
        <div className="blureLine"></div>
        
        <button className="registerButton" onClick={ () => { this.toggleBooleanVariableFromState("showRegisterModal") }}>Register now!</button>
        <button className="loginButton" onClick={ () => { this.toggleBooleanVariableFromState("showLoginModal") }}>or login</button>
        
        {showRegisterModal && <RegisterModal toggleFunctionFromParent={ () => { this.toggleBooleanVariableFromState("showRegisterModal") } } />}
        {showLoginModal && <LoginModal toggleFunctionFromParent={ () => { this.toggleBooleanVariableFromState("showLoginModal") } } />}
      </div>
    );
  }
};

module.exports = IndexPage;