const React = require("react");
const styles = require("../../styles/IndexPage");

class RegisterModal extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     
   }
  }
  
  
  render() {
   return (
      <form action="" className="IndexPage__registerModal">
      <div className="registerFormContainer">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>

        <label htmlFor ="email">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required/>

        <label htmlFor ="password">Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required/>

        <label htmlFor ="psw-repeat">Repeat Password</label>
        <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>

        <label>
          <input type="checkbox" name="remember"/> Remember me
        </label>

        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

        <div className="clearfix">
          <button type="button" className="cancelButton">Cancel</button>
          <button type="submit" className="signupButton">Sign Up</button>
        </div>
      </div>
    </form>
   );
  }
}
  


module.exports = RegisterModal;