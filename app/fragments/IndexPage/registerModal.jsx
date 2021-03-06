const React = require("react");

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 8;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 16;

class RegisterModal extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     email: "",
     username: "",
     password: "",
     showErrorBox: false,
     validationErrorTexts: [],
     signUpButtonDisabled: false,
     textOfModalHeader: "Sign Up",
     signUpButtonOpacity: 1
   }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.shouldRenderValidationErrorBox = this.shouldRenderValidationErrorBox.bind(this);
    this.renderValidationErrorBox = this.renderValidationErrorBox.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  validateUsername(username) {
    // Minimum and maximum characters
   return (username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH) ? true : false;
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
    
    let texts = [];
    
    if(!this.validateEmail(email)) {
      texts.push("Invalid email");
    }
    if(!this.validateUsername(username)) {
      texts.push(`Username: minimum ${MIN_USERNAME_LENGTH} and maximum ${MAX_USERNAME_LENGTH} characters`);
    }
    if(!this.validatePassword(password)) {
      texts.push(`Password: minimum ${MIN_PASSWORD_LENGTH} and maximum ${MAX_PASSWORD_LENGTH} characters, at least one uppercase letter, one lowercase letter, one number and one special character`);
    }
    this.setState({
      validationErrorTexts: texts
    });
  }
  
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  async signUp() {
    const { email, username, password } = this.state;
    const newUser = {
      email: email,
      username: username,
      password: password
    }
    
    try {
      const response = await fetch(
        "authenticating/signup", 
         { method: "post", 
          credentials: "include", 
          headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
          body: JSON.stringify(newUser)});

      if(response.redirected && response.ok) {
        window.location.assign(response.url);
        this.setState({
          showErrorBox: false,
          signUpButtonOpacity: 1,
          textOfModalHeader: "Successfully completed! \n You will be redirected to your playground"
        });
      }
      else {
        throw new Error(response.status);
      }
    }
    catch(error) {
      if(error.message == 409) {
          this.setState({
            signUpButtonDisabled: false,
            signUpButtonOpacity: 1,
            textOfModalHeader: "Error: this email is already registered"
          });
        }
        else {
          this.setState({
            signUpButtonDisabled: false,
            signUpButtonOpacity: 1,
            textOfModalHeader: "Server-side error: please, try again later"
        });
      }
    }
  }
  
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      signUpButtonDisabled: true,
      signUpButtonOpacity: 0.7,
      textOfModalHeader: "Please, wait..."
    });
    
    if(this.shouldRenderValidationErrorBox()) {
      this.renderValidationErrorBox();
      this.setState({
              signUpButtonDisabled: false,
              signUpButtonOpacity: 1,
              textOfModalHeader: "Sign Up"
            });
    }
    else {
      this.signUp();
    }
  }
  
  renderValidationErrorBox() {
    this.setValidationErrorText();
    this.setState({
      showErrorBox: true
    });
  }
  
  render() {
    const { toggleFunctionFromParent } = this.props;
    const { showErrorBox, 
           validationErrorTexts, 
           signUpButtonDisabled, 
           textOfModalHeader, 
           signUpButtonOpacity } = this.state;
    
   return (
      <form onSubmit={this.handleSubmit} className="IndexPage__modal">
      <div className="formContainer">
        <h1 className="label">{ textOfModalHeader }</h1>
        <p className="labelToolTip">Please fill in this form to create an account.</p>
        <hr/>

        <label htmlFor ="email" className="labelEmail">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="username" className="labelUsername">Username</label>
        <input type="text" placeholder="Enter Username" name="username" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="password" className="labelPassword">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required className="modalInput" onChange={this.handleInputChange}/>

        <p className="confirmText ">By creating an account you agree to our <a href="#" className="confirmLink">Terms & Privacy</a>.</p>
        
        { showErrorBox && 
        <div className="errorBox"> 
          { validationErrorTexts.map((text) => {
            return <p key={text} className="errorParagraph"> { text } </p>;
          })} 
        </div> }

        <div className="clearfix">
          <button type="button" className="cancelButton" onClick={ toggleFunctionFromParent }>Cancel</button>
          <button type="submit" className="modalButton" disabled={signUpButtonDisabled} style={{opacity: signUpButtonOpacity}}>Sign Up</button>
        </div>
      </div>
    </form>
   );
  }
}
  


module.exports = RegisterModal;