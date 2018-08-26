const React = require("react");
const styles = require("../../../../styles/PVE");

const generateNewPet =  require("../../../../functions/generateNewPet");
const generateName =  require("../../../../functions/generateName");
const generateLVL =  require("../../../../functions/generateLVL");
const generatePoints =  require("../../../../functions/generatePoints");

const generateRandomMathQuestion =  require("../../../../functions/generateRandomMathQuestion");

const Interface =  require("./pve/interface");
const Battleground =  require("./pve/battleground");

class ArenaPVE extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
      Bot: {
        botname: generateName(), 
        lvl: generateLVL(props.userLVL),
        pet: generateNewPet("bot")
      },
      User: {},
      
      creatingBattleLogError: null,
      gettingUserPetError: null,
      
      timelineWidthPercent: 100,
      mathQuestion: "MathQuestion",
      round: 1,
      turn: null,
      
      battleState: "starting",
      timerState: "pause",
      answerState: null,
      
      points: {
        bot: {},
        user: {}
      },
      
      chosenPointForAttack: {
        bot: null,
        user: null
      },
      chosenPointForDefense: {
        bot: null,
        user: null
      }
    }
    
    this.createBattleLogInDB = this.createBattleLogInDB.bind(this);
    this.startBattle = this.startBattle.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.answerMathQuestion = this.answerMathQuestion.bind(this);
    this.calculateTimelineInlineStyles = this.calculateTimelineInlineStyles.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.unhandleKeyUp = this.unhandleKeyUp.bind(this);
    this.generateBotPoints = this.generateBotPoints.bind(this);
    this.generateUserPoints = this.generateUserPoints.bind(this);
    this.autoChooseAttackPointForUser = this.autoChooseAttackPointForUser.bind(this);
    this.autoChooseDefensePointForBot = this.autoChooseDefensePointForBot.bind(this);
    this.playUserPetAttackAnimation = this.playUserPetAttackAnimation.bind(this);
  }
  
  playUserPetAttackAnimation() {
    const userPet = document.getElementById("userPVEpet");
    const { battleState, chosenPointForAttack} = this.state;
    const { position } = chosenPointForAttack.bot;
    
    if (battleState !== "user pet attack animation") return;
    
    switch (position) {
      case "top":
        userPet.animate([
           {
            position: "absolute",
            left: "380px",
            top: "-65px",
          }

//           {
//             left: "540px",
//             top: "initial",
//           },

//           {
//             left: "0px",
//             position: "initial",
//           }
        ], { 
          duration: 6000,
          iterations: 1
        });
        break;
      case "middle":
        userPet.style.animation = "middleUserPetAttack 10s 0.1";
        break;
      case "bottom":
        userPet.style.animation = "bottomUserPetAttack 10s 0.1";
        break;
      default:
        throw new Error("unknown chosenPointForAttack.bot.position");
    }
    
    this.setState({
      battleState: "user attack calculation"
    });
  }
  
 autoChooseDefensePointForBot() {
   const { userLVL } = this.props;
   const { points, chosenPointForAttack } = this.state;
   
   const chanceToChooseRightDefensePoint = userLVL/10;
   
   if (chanceToChooseRightDefensePoint > Math.random) {
     this.setState( (prevState) => {
       return ({ 
         chosenPointForDefense: {
           bot: {
             point: prevState.chosenPointForAttack.bot.point,
             position: prevState.chosenPointForAttack.bot.position
           },
           user: null
         },
         battleState: "user pet attack animation"
       });
     });
   }
   else {
     Object.keys(points.bot).map( (position, index) => {
       if (chosenPointForAttack.bot.position !== position) {
         this.setState({
           chosenPointForDefense: {
             bot: {
               point: points.bot[position],
               position: position
             },
             user: null
           },
           battleState: "user pet attack animation"
         });
       }
     });
   }
   
   this.playUserPetAttackAnimation();
 }
  
 autoChooseAttackPointForUser() {
   const { battleState, points } = this.state;
   
   if (battleState === "user choosing attack point") {
     const randomNumber =  Math.random();
     
     let position = null;
     
     if (randomNumber > 0.6) {
       position = "top";
     } 
     else if (randomNumber > 0.3) {
       position = "middle";
     }
     else {
       position = "bottom";
     }
     
      this.setState({
        chosenPointForAttack: {
          bot: {
            point: points.bot[position],
            position: position
          },
          user: null
        },
        battleState: "bot choosing defense point"
      });
     
      setTimeout(this.autoChooseDefensePointForBot, 1000);
   }
 }
  
 generateBotPoints() {
   this.setState({
     points: {
        bot: generatePoints(),
        user: {}
     }
   });
 }
  
generateUserPoints() {
   this.setState({
     points: {
        bot: {},
        user: generatePoints()
     }
   });
 }
  
 handleKeyUp() {
   document.onkeyup = (event) => {
     const { battleState, points } = this.state;
     if (battleState === "user choosing attack point") {
       const letter = event.key.toUpperCase();
       
       Object.keys(points.bot).map( (key, index) => {
         if (letter === points.bot[key]) {
           this.setState({
             chosenPointForAttack: {
               bot: {
                 point: letter,
                 position: key
               },
               user: null
             },
             battleState: "bot choosing defense point"
           });
           
           setTimeout(this.autoChooseDefensePointForBot, 1000);
         }
       });
         
         
     }
   }
 }
  
 unhandleKeyUp() {
   document.onkeyup = null;
 }
  
 answerMathQuestion(event) {
   event.preventDefault();
   
   const { mathQuestion, battleState } = this.state;
   
   if (battleState !== "user answering") return;
   
   const data = new FormData(event.target);
   const answer = data.get("answer");
   
   if (mathQuestion.answer.toString() === answer) {
     this.setState({
       answerState: true
     });
   }
   else {
     this.setState({
       answerState: false
     });
   }
   
   this.setState({
     battleState: "user choosing attack point"
   });
   
   this.generateBotPoints();
   setTimeout(this.autoChooseAttackPointForUser, 5000);
 }
  
 startBattle() {
   this.handleKeyUp();
   
   this.setState({
     mathQuestion: generateRandomMathQuestion(),
     battleState: "user answering",
     timerState: "running",
     turn: "user"
   });
 }
  
 runTimer() {
   this.timer = setInterval( () => {
     const { timerState, timelineWidthPercent, answerState } = this.state;
     
     if (timerState === "running" && timelineWidthPercent > 0 && answerState === null) {
       this.setState( (prevState) => {
         return ({ 
           timelineWidthPercent: prevState.timelineWidthPercent - 1
         });
       });
     }
     
     else if (timerState === "running" && timelineWidthPercent === 0 && answerState === null) {
       this.setState( (prevState) => {
         return ({ 
           timelineWidthPercent: 100,
           timerState: "pause",
           answerState: false,
           battleState: "user choosing attack point"
         });
       });
       
       this.generateBotPoints();
       setTimeout(this.autoChooseAttackPointForUser, 5000);
     }
     
     else if (timerState === "running" && answerState !== null) {
       this.setState( (prevState) => {
         return ({ 
           timelineWidthPercent: 100,
           timerState: "pause"
         });
       });
     }
   }, 100);
 }

  calculateTimelineInlineStyles(timelineWidthPercent, answerState) {
    let timelineInlineStyles = {
      width: timelineWidthPercent + "%"
    };
    if (answerState === true) {
      timelineInlineStyles = { 
        background: "greenyellow" ,
        width: timelineWidthPercent + "%"
      };
    }
    else if (answerState === false) {
      timelineInlineStyles = { 
        background: "#ff0a0a",
        width: timelineWidthPercent + "%"
      };
    }
    
    return timelineInlineStyles;
  }
  
 async getUserPet() {
   const { chosenPetForBattleID } = this.props;
   
   try {
     const response = await fetch(
       `/user/pet/${chosenPetForBattleID}`, 
       { method: "get", 
       credentials: "include", 
       headers: { "Content-Type": "application/json", "Accept":"application/json" } });

     const result = await response.json();
     if (result.pet.alive === true) {
       this.setState( (prevState, props) => { return({ 
           User: {
             username: props.username,
             pet: result.pet
           }  
         }); 
       });
     }
     else {
       throw new Error("Chosen pet is dead");
     }
   }
   catch (gettingUserPetError) {
     this.setState({ gettingUserPetError });
   }
 }
  
  async createBattleLogInDB() {
    const { Bot, User } = this.state;
    
    const userPet = User.pet;
    
    const data = {
      battleLog: {
        type: "PVE",
        userPet: userPet,
        enemy: Bot
       }
    }
    
    try {
        const response = await fetch(
          "user/battles/logs",
          { method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
          body: JSON.stringify(data)});
      
        if(!response.ok) {
          throw new Error(response.status);
        }
      }
      catch(creatingBattleLogError) {
        this.setState({ creatingBattleLogError });
      }
  }
  
  componentDidMount() {
    this.getUserPet()
      .then(() => {
        this.createBattleLogInDB();
        this.startBattle();
        this.runTimer();
      });
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
    this.unhandleKeyUp();
  }
  
  render() {
    const { Bot, 
           User, 
           gettingUserPetError, 
           timelineWidthPercent, 
           mathQuestion, 
           round,
           turn,
           answerState,
           points,
           chosenPointForAttack,
           chosenPointForDefense } = this.state;
    
    const timelineInlineStyles = this.calculateTimelineInlineStyles(timelineWidthPercent, answerState);
    
    if(gettingUserPetError) {   
      return(
        <div className="ArenaPVEcontainer">
          Your chosen pet for battle is dead or server doesn't response
        </div>
      );
    }
    
    return(
      <div className="ArenaPVEcontainer">
        <Interface 
          mathQuestion={ mathQuestion } 
          round={ round }
          answerMathQuestion={ this.answerMathQuestion }
          timelineInlineStyles={ timelineInlineStyles }/>
        
        { User.pet && 
        <Battleground 
          Bot={ Bot }
          User={ User } 
          turn={ turn }
          points={ points }
          chosenPointForAttack={ chosenPointForAttack }
          chosenPointForDefense={ chosenPointForDefense } /> }
      </div>
    );
  }
}

module.exports = ArenaPVE;