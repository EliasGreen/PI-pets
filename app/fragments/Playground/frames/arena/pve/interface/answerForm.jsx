const React = require("react");

class AnswerForm extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return(
      <form>
        <label> Answer: </label>
        <input type="text" name="answer" />
        <input type="submit" value="answer" />
      </form>
    );
  }
}

module.exports = AnswerForm;