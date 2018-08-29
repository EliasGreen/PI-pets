const React = require("react");

const Round = require("./interface/round");
const Timeline = require("./interface/timeline");
const MathQuestion = require("./interface/mathQuestion");
const AnswerForm = require("./interface/answerForm");
const HitTooltip = require("./interface/hitTooltip");
const FinalModal = require("./interface/finalModal");

class Interface extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { mathQuestion,
           round,
           answerMathQuestion,
           timelineInlineStyles, 
           userPetDamage,
           botPetDamage,
           xpUserWillGet,
           coinsUserWillGet,
           username,
           botname,
           showFinalBattleModal,
           battleState,
           setDefaultCurrentArenaFRAME } = this.props;
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
        
        { 
          (userPetDamage || botPetDamage) && <HitTooltip key={userPetDamage || botPetDamage} botPetDamage={ botPetDamage } userPetDamage={ userPetDamage }/>
        }
        
        { 
          showFinalBattleModal && 
            <FinalModal 
              battleState={ battleState }
              xpUserWillGet={ xpUserWillGet }
              coinsUserWillGet={ coinsUserWillGet }
              username={ username }
              botname={ botname }
              setDefaultCurrentArenaFRAME={ setDefaultCurrentArenaFRAME } /> 
        }
      </div>
    );
  }
}

module.exports = Interface;