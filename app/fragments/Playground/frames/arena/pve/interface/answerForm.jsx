const React = require("react");

class AnswerForm extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { answerMathQuestion } = this.props;
    return(
      <form onSubmit={(event) => { answerMathQuestion(event) }}>
          <label> Answer: </label>
          <input autoFocus type="number" name="answer" autoComplete="off" />
          <button type="submit"> asnwer </button>
      </form>
    );
  }
}

module.exports = AnswerForm;