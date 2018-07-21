const React = require("react");
const styles = require("../../styles/IndexPage");

class LoginModal extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     email: "",
     password: "",
     textOfModalHeader: "Login",
     errorText: "",
     showErrorBox: false,
     loginButtonDisabled: false,
     loginButtonOpacity: 1
   }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }
   
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  async login() {
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    }
    
    try {
      const response = await fetch("authenticating/login", { method: "post", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" }, body: JSON.stringify(user)});
      
      if(response.redirected && response.ok) {
        window.location.assign(response.url);
        this.setState({
          showErrorBox: false,
          loginButtonOpacity: 1,
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
          loginButtonDisabled: false,
          loginButtonOpacity: 1,
          showErrorBox: true,
          errorText: "Error: invalid email or password",
          textOfModalHeader: "Login"
        });
      }
      else {
        this.setState({
          loginButtonDisabled: false,
          loginButtonOpacity: 1,
          showErrorBox: true,
          errorText: "Server-side error: please, try again later",
          textOfModalHeader: "Login"
        });
      }
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loginButtonDisabled: true,
      loginButtonOpacity: 0.7,
      textOfModalHeader: "Please, wait..."
    });
    
    this.login();
  }
  
  render() {
    const { toggleFunctionFromParent } = this.props;
    const { showErrorBox, errorText, loginButtonDisabled, textOfModalHeader, loginButtonOpacity } = this.state;
   return (
      <form onSubmit={this.handleSubmit} className="IndexPage__modal">
      <div className="formContainer">
        <h1 className="label">{ textOfModalHeader }</h1>
        <p className="labelToolTip">Please fill in this form to login.</p>
        <hr/>

        <label htmlFor ="email" className="labelEmail">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="password" className="labelPassword">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required className="modalInput" onChange={this.handleInputChange}/>
        
        { showErrorBox && <div className="errorBox"><p className="errorParagraph">{ errorText }</p></div> }

        <div className="clearfix">
          <button type="button" className="cancelButton" onClick={ toggleFunctionFromParent }>Cancel</button>
          <button type="submit" className="modalButton" disabled={ loginButtonDisabled } style={{ opacity: loginButtonOpacity }}>Login</button>
        </div>
      </div>
    </form>
   );
  }
}
  


module.exports = LoginModal;