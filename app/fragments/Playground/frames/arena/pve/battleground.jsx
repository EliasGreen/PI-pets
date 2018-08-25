const React = require("react");

const UserSide = require("./battleground/userSide");
const BotSide = require("./battleground/botSide");

class Battleground extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { User, Bot, turn, points, chosenPoint } = this.props;
    
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
          userChosenPoint={ chosenPoint.user } />
        <BotSide 
          Bot={ Bot } 
          styleForBotName={ styleForBotName }
          botPoints={ points.bot }
          botChosenPoint={ chosenPoint.bot } />
      </div>
    );
  }
}

module.exports = Battleground;