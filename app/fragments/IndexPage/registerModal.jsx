const React = require("react");
const styles = require("../../styles/IndexPage");

class RegisterModal extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     email: "",
     username: "",
     password: ""
   }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }
  
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  validateUsername(username) {
   return (username.length >= 3 && username.length <= 15) ? true : false;
  }
  
  validatePassword(password) {
   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
   return re.test(password);
  } 
  
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const { email, username, password} = this.state;
    
    console.log(email, username, password);
    console.log("email " + this.validateEmail(email));
    console.log("username " + this.validateUsername(username));
    console.log("password " + this.validatePassword(password));
  }
  
  render() {
    const { toggleFunctionFromParent } = this.props;
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