const React = require("react");

class MathQuestion extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { mathQuestion } = this.props;
    return(
      <div className="mathQuestionContainer">
        { mathQuestion.question }
      </div>
    );
  }
}

module.exports = MathQuestion;