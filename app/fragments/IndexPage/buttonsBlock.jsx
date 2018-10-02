const React = require("react");

const ButtonsBlock = ({ toggleBooleanVariableFromState }) => (
  <React.Fragment>
    <div className="blureLine"></div>
        
    <button className="registerButton" onClick={ () => { toggleBooleanVariableFromState("showRegisterModal") }}>Register now!</button>
    <button className="loginButton" onClick={ () => { toggleBooleanVariableFromState("showLoginModal") }}>or login</button>
  </React.Fragment>
);

module.exports = ButtonsBlock;