const React = require("react");

class MathQuestion extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { mathQuestion } = this.props;
    
    if (mathQuestion.question) {
      return(
        <div className="mathQuestionContainer">
          { mathQuestion.question }
        </div>
      );
    }
    else {
      return(
        <div className="mathQuestionContainer">
          { mathQuestion }
        </div>
      );
    }
  }
}

module.exports = MathQuestion;