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
  }
   
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loginButtonDisabled: true,
      loginButtonOpacity: 0.7,
      textOfModalHeader: "Please, wait..."
    });
    
    const { email, password } = this.state;
    
    const user = {
      email: email,
      password: password
    }

    fetch("authenticating/login",
    {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
      .then((response) => {
        if(response.ok) {
          return response;
        }
        throw new Error(response.status);
        })
      .then((response) => {
        window.location.assign(response.url);
        this.setState({
            showErrorBox: false,
            loginButtonOpacity: 1,
            textOfModalHeader: "Successfully completed! \n You will be redirected to your playground"
          });
        })
      .catch((error) => {
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
      });
  }
  
  render() {
    const { toggleFunctionFromParent } = this.props;
    const { showErrorBox, errorText, loginButtonDisabled, textOfModalHeader, loginButtonOpacity } = this.state;
   return (
      <form onSubmit={this.handleSubmit} className="IndexPage__registerModal">
      <div className="registerFormContainer">
        <h1 className="labelSignUp">{ textOfModalHeader }</h1>
        <p className="labelToolTip">Please fill in this form to login.</p>
        <hr/>

        <label htmlFor ="email" className="labelEmail">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required className="modalInput" onChange={this.handleInputChange}/>
        
        <label htmlFor ="password" className="labelPassword">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required className="modalInput" onChange={this.handleInputChange}/>
        
        { showErrorBox && <div className="errorBox">{ errorText }</div> }

        <div className="clearfix">
          <button type="button" className="cancelButton" onClick={ toggleFunctionFromParent }>Cancel</button>
          <button type="submit" className="signupButton" disabled={ loginButtonDisabled } style={{ opacity: loginButtonOpacity }}>Login</button>
        </div>
      </div>
    </form>
   );
  }
}
  


module.exports = LoginModal;