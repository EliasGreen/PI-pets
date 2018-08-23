const React = require("react");


const Timeline = require("./interface/timeline");
const MathQuestion = require("./interface/mathQuestion");
const AnswerForm = require("./interface/answerForm");

class Interface extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return(
      <div className="interface">
        <MathQuestion />
        
        <AnswerForm />
        
        <Timeline />
      </div>
    );
  }
}

module.exports = Interface;