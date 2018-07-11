const React = require("react");
const styles = require("../../styles/IndexPage");

class RegisterModal extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     email: "",
     username: "",
     password: "",
     showErrorBox: false,
     validationErrorText: ""
   }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.shouldRenderValidationErrorBox = this.shouldRenderValidationErrorBox.bind(this);
    this.renderValidationErrorBox = this.renderValidationErrorBox.bind(this);
  }
  
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  validateUsername(username) {
    // Minimum 3 and maximum 15 characters
   return (username.length >= 3 && username.length <= 15) ? true : false;
  }
  
  validatePassword(password) {
    // Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
   return re.test(password);
  }
  
  shouldRenderValidationErrorBox() {
    const { email, username, password } = this.state;
  
    if(this.validateEmail(email) && this.validateUsername(username) && this.validatePassword(password)) {
      return false;
    }
    else {
      return true; 
    }
  }
  
  setValidationErrorText() {
    const { email, username, password } = this.state;
    const text = "";
    
    if (!this.validateEmail(email)) {
      text += "Invalid email \n"
    }
    if (!this.validateUsername(username)) {
      text += "Username: minimum 3 and maximum 15 characters \n"
    }
    if (!this.validatePassword(password)) {
      text += "Password: minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character \n"
    }
    this.setState({
      validationErrorText: text
    });
  }
  
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    if(this.shouldRenderValidationErrorBox()) {
      this.renderValidationErrorBox();
    }
    else {
      this.setState({
      showErrorBox: false
      });
    }
  }
  
  renderValidationErrorBox() {
    this.validationErrorText();
    this.setState({
      showErrorBox: true
    });
  }
  
  render() {
    const { toggleFunctionFromParent } = this.props;
    const { showErrorBox, validationErrorText } = this.state;
   return (
      <form onSubmit={this.handleSubmit} className="IndexPage__registerModal">
      <div className="registerFormContainer">
        <h1 className="labelSignUp">Sign Up</h1>
        <p className="labelToolTip">Please fill in this form to create an account.</p>
        <hr/>

        <label htmlFor ="email" className="labelEmail">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="username" className="labelUsername">Username</label>
        <input type="text" placeholder="Enter Username" name="username" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="password" className="labelPassword">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required className="modalInput" onChange={this.handleInputChange}/>

        <p className="confirmText ">By creating an account you agree to our <a href="#" className="confirmLink">Terms & Privacy</a>.</p>
        
        {showErrorBox && <div className="errorBox"> {validationErrorText} </div>}

        <div className="clearfix">
          <button type="button" className="cancelButton" onClick={ toggleFunctionFromParent }>Cancel</button>
          <button type="submit" className="signupButton">Sign Up</button>
        </div>
      </div>
    </form>
   );
  }
}
  


module.exports = RegisterModal;