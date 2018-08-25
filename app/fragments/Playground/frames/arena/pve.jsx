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
      
      chosenPoint: {
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
             chosenPoint: {
               bot: {
                 point: letter,
                 position: key
               },
               user: null
             },
             battleState: "user pet attack animation"
           });
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
       answerState: true,
       battleState: "user choosing attack point"
     });
     
     this.generateBotPoints();
   }
   else {
     this.setState({
       answerState: false,
       battleState: "user choosing attack point"
     });
     
     this.generateBotPoints();
   }
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
         
         this.generateBotPoints();
       });
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
           chosenPoint } = this.state;
    
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
          chosenPoint={ chosenPoint } /> }
      </div>
    );
  }
}

module.exports = ArenaPVE;