const React = require("react");

const UserSide = require("./battleground/userSide");
const BotSide = require("./battleground/botSide");
const RunFromBattleButton = require("./battleground/runFromBattleButton");

class Battleground extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { User, Bot, turn, points, chosenPointForAttack, chosenPointForDefense, setDefaultCurrentArenaFRAME } = this.props;
    
    let styleForUserName = {};
    let styleForBotName = {};
    
    const styleCurrentTurn = {
      textShadow: 
       `#FFF 0px 0px 5px, 
        #FFF 0px 0px 10px, 
        #FFF 0px 0px 15px, 
        #FF2D95 0px 0px 20px, 
        #FF2D95 0px 0px 30px, 
        #FF2D95 0px 0px 40px, 
        #FF2D95 0px 0px 50px, 
        #FF2D95 0px 0px 75px `
     };
    
    if (turn === "user") {
      styleForUserName = styleCurrentTurn;
    }
    else if(turn === "bot") {
      styleForBotName = styleCurrentTurn;
    }
    
    return(
      <div className="battleground">
        <UserSide
          User={ User } 
          styleForUserName={ styleForUserName }
          userPoints={ points.user }
          userChosenPointForAttack={ chosenPointForAttack.user }
          userChosenPointForDefense={ chosenPointForDefense.user } />
        <BotSide 
          Bot={ Bot } 
          styleForBotName={ styleForBotName }
          botPoints={ points.bot }
          botChosenPointForAttack={ chosenPointForAttack.bot }
          botChosenPointForDefense={ chosenPointForDefense.bot } />
        <RunFromBattleButton setDefaultCurrentArenaFRAME={ setDefaultCurrentArenaFRAME } />
      </div>
    );
  }
}

module.exports = Battleground;