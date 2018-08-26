const React = require("react");

const Round = require("./interface/round");
const Timeline = require("./interface/timeline");
const MathQuestion = require("./interface/mathQuestion");
const AnswerForm = require("./interface/answerForm");

class Interface extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { mathQuestion, round, answerMathQuestion, timelineInlineStyles } = this.props;
    return(
      <div className="interface">
        <Round 
          round={ round } />
        
        <MathQuestion 
          mathQuestion={ mathQuestion } />
        
        <AnswerForm 
          answerMathQuestion={ answerMathQuestion } />
        
        <Timeline 
          timelineInlineStyles={ timelineInlineStyles }/>
      </div>
    );
  }
}

module.exports = Interface;