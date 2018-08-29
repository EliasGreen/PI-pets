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
      
      botPetDamage: null,
      userPetDamage: null,
      
      xpUserWillGet: 0,
      coinsUserWillGet: 0,
      
      creatingBattleLogError: null,
      gettingUserPetError: null,
      finalSetupError: null,
      unknownError: null,
      
      timelineWidthPercent: 100,
      mathQuestion: "MathQuestion",
      round: 1,
      turn: "user",
      
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
      },
      
      showFinalBattleModal: false
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
    this.calculateUserPetAttack = this.calculateUserPetAttack.bind(this);
    this.calculateBotPetAttack = this.calculateBotPetAttack.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.handleFinalOfBattle = this.handleFinalOfBattle.bind(this); 
    this.playBotPetAttackAnimation = this.playBotPetAttackAnimation.bind(this); 
    this.botPetDamageCalculation = this.botPetDamageCalculation.bind(this);
    this.setNewUserPetHitPointsIntoDB = this.setNewUserPetHitPointsIntoDB.bind(this);
    this.incrementRound = this.incrementRound.bind(this);
  }
  
  incrementRound() {
    this.setState( prevState => {
      return({
        round: prevState.round + 1
      });  
    });
  }
  
  async setNewUserPetHitPointsIntoDB(newUserPetHitPoints, petID) {
    const data = {
      updatedPetHitPoints: newUserPetHitPoints
    }
    
    const options = { 
      method: "put", 
      credentials: "include",
      headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
      body: JSON.stringify(data)
    };
    
    try {
      await fetch(`user/pet/${petID}/hitpoints`, options);
    }
    catch (unknownError) {
      this.setState({ unknownError });
    }
  }
  
  botPetDamageCalculation(BOT_PET_ATTACK_ANIMATION_TIME_MS) {
    this.setState({ 
      battleState: "bot pet damage calculation"
    });
    
    const { chosenPointForAttack, chosenPointForDefense, answerState, User, Bot } = this.state;
    
    const BOT_DAMAGE_DECREASE_RATE = 0.7;
    const USER_DEFENSE_DECREASE_RATE = 0.7;
    
    if (!chosenPointForDefense.user) chosenPointForDefense.user = { position: "placeholer-plug" };
    
    const userPetDefense = (chosenPointForAttack.user.position === chosenPointForDefense.user.position) ?
                           User.pet.defense :
                           Math.round(User.pet.defense * USER_DEFENSE_DECREASE_RATE);
     
    const botPetDamage = (answerState === true) ? 
                           Math.max(1, (Bot.pet.attack - userPetDefense)): 
                           Math.max(1, (Math.round(Bot.pet.attack * BOT_DAMAGE_DECREASE_RATE) - userPetDefense));
    
    const newUserPetHitPoints = Math.max(0, (User.pet.hitPoints - botPetDamage));
    User.pet.hitPoints = newUserPetHitPoints;
    this.setState({ 
      User: User,
      botPetDamage: botPetDamage
    });
    
    this.setNewUserPetHitPointsIntoDB(newUserPetHitPoints, User.pet._id);
    
    if (newUserPetHitPoints !== 0) {
      this.setState({ 
        battleState: "changing turn",
      });
        
      setTimeout( () => {
        this.changeTurn();
        this.incrementRound();
      }, BOT_PET_ATTACK_ANIMATION_TIME_MS/2);
    }
    else {
      this.setState({ 
        battleState: "bot have won"
      });
      
      setTimeout(this.handleFinalOfBattle, BOT_PET_ATTACK_ANIMATION_TIME_MS/2);
    }
  }
  
  playBotPetAttackAnimation(BOT_PET_ATTACK_ANIMATION_TIME_MS) {
    const { battleState } = this.state;
    
    const botPet = document.getElementById("botPVEpet").firstChild;
    botPet.style.zIndex = "1";
    const { chosenPointForAttack} = this.state;
    const { position } = chosenPointForAttack.user;
    
    switch (position) {
      case "top":
        botPet.classList.add("topBotPetAttackAnimation");
        setTimeout( () => botPet.classList.remove("topBotPetAttackAnimation"), BOT_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      case "middle":
        botPet.classList.add("middleBotPetAttackAnimation");
        setTimeout( () => botPet.classList.remove("middleBotPetAttackAnimation"), BOT_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      case "bottom":
        botPet.classList.add("bottomBotPetAttackAnimation");
        setTimeout( () => botPet.classList.remove("bottomBotPetAttackAnimation"), BOT_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      default:
        throw new Error("unknown chosenPointForAttack.user.position");
    }
  }
  
  calculateBotPetAttack() {
    const { battleState, Bot } = this.state;
    
    if (battleState !== "bot pet attack calculation") return;
    
    const _CHANCE_DECREASER = 20;
    const botMathQuestionAnswer = 
          (Bot.lvl / _CHANCE_DECREASER) > Math.random()
          ? true
          : false;
    
    this.generateUserPoints();
    const pointsPositions = ["top", "middle", "bottom"];
    const chosenPointPositionForAttack = pointsPositions[Math.floor(Math.random() * 3)];
    const { points } = this.state;
    const chosenPointForAttack = {
      point: points.user[chosenPointPositionForAttack],
      position: chosenPointPositionForAttack
    }
    
    this.setState( prevState => { 
       return({
         battleState: "user choosing defense point",
         answerState: botMathQuestionAnswer,
         chosenPointForAttack:  
           Object.assign({}, prevState.chosenPointForAttack, { user: chosenPointForAttack })
       });
    });
    
    const BOT_PET_ATTACK_ANIMATION_TIME_MS = 8000;
    this.playBotPetAttackAnimation(BOT_PET_ATTACK_ANIMATION_TIME_MS);
    
    setTimeout( () => this.botPetDamageCalculation(BOT_PET_ATTACK_ANIMATION_TIME_MS), BOT_PET_ATTACK_ANIMATION_TIME_MS/2);
  }
  
  async handleFinalOfBattle() {
    const { battleState, Bot } = this.state;
    
    this.setState({
      showFinalBattleModal: true
    });
    
    let data = {
      newBattleLogStatus: battleState
    }

    let options = { 
      method: "put", 
      credentials: "include",
      headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
      body: JSON.stringify(data)
    };
    
    if (battleState === "user have won") {
      const XP = 15;
      const xpUserWillGet = Math.round(XP * (Bot.lvl+1) * Math.random());
      
      const COINS = 30;
      const coinsUserWillGet = Math.round(COINS * (Bot.lvl+1) * Math.random());
      
      this.setState({
        xpUserWillGet: xpUserWillGet,
        coinsUserWillGet: coinsUserWillGet
      });
      
      try {
        await fetch("user/battles/logs", options);
        
        data = {
          xp: xpUserWillGet
        };
        options.method = "post";
        options.body = JSON.stringify(data);
        await fetch("user/xp", options);
        
        data = {
          coins: coinsUserWillGet
        };
        options.body = JSON.stringify(data);
        await fetch("user/coins", options);
      }
      catch (finalSetupError) {
        this.setState({ finalSetupError });
      }
    }
    else if (battleState = "bot have won") {
      try {
        await fetch("user/battles/logs", options);
      }
      catch (finalSetupError) {
        this.setState({ finalSetupError });
      }       
    }
  }
  
  changeTurn() {
    const { battleState, turn } = this.state;
    
    if (battleState !== "changing turn") return;
    
    const newTurn = turn === "user" ? "bot" : "user";
    const newBattleState = turn === "user" ? "bot pet attack calculation" : "user answering";
    const nextFunction = turn === "user" ? this.calculateBotPetAttack : this.startBattle;
    
    const answerInput = document.forms.answer.elements.answer;
    answerInput.value = null;
    
    this.setState({
      mathQuestion: "MathQuestion",
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
      },
      
      turn: newTurn,
      battleState: newBattleState,
      botPetDamage: null,
      userPetDamage: null
    });
    
    nextFunction();
  }
  
  calculateUserPetAttack(USER_PET_ATTACK_ANIMATION_TIME_MS) {
    const { User, Bot, answerState, chosenPointForAttack, chosenPointForDefense, battleState } = this.state;
    
    if (battleState !== "user attack calculation") return;
    
    const USER_DAMAGE_DECREASE_RATE = 0.7;
    const BOT_DEFENSE_DECREASE_RATE = 0.7;
    
    const botPetDefense = (chosenPointForAttack.bot.position === chosenPointForDefense.bot.position) ?
                           Bot.pet.defense :
                           Math.round(Bot.pet.defense * BOT_DEFENSE_DECREASE_RATE);
     
    const userPetDamage = (answerState === true) ? 
                           Math.max(1, (User.pet.attack - botPetDefense)): 
                           Math.max(1, (Math.round(User.pet.attack * USER_DAMAGE_DECREASE_RATE) - botPetDefense));
    
    
    const newBotPetHitPoints = Bot.pet.hitPoints - userPetDamage;
    Bot.pet.hitPoints = newBotPetHitPoints;
    this.setState({ Bot });
    
    setTimeout( () => {
      if (newBotPetHitPoints > 0) {
        this.setState({ 
          userPetDamage: userPetDamage,
          battleState: "changing turn",
        });
        
        setTimeout(this.changeTurn, USER_PET_ATTACK_ANIMATION_TIME_MS/2);
      }
      else {
        this.setState({ 
          userPetDamage: userPetDamage,
          battleState: "user have won",
        });
        
        setTimeout(this.handleFinalOfBattle, USER_PET_ATTACK_ANIMATION_TIME_MS/2);
      }
    }, USER_PET_ATTACK_ANIMATION_TIME_MS/2);
  }                 
  
  playUserPetAttackAnimation() {
    const userPet = document.getElementById("userPVEpet").firstChild;
    userPet.style.zIndex = "1";
    const { battleState, chosenPointForAttack} = this.state;
    const { position } = chosenPointForAttack.bot;
    
    if (battleState !== "user pet attack animation") return;
    
    const USER_PET_ATTACK_ANIMATION_TIME_MS = 1000;
    
    switch (position) {
      case "top":
        userPet.classList.add("topUserPetAttackAnimation");
        setTimeout( () => userPet.classList.remove("topUserPetAttackAnimation"), USER_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      case "middle":
        userPet.classList.add("middleUserPetAttackAnimation");
        setTimeout( () => userPet.classList.remove("middleUserPetAttackAnimation"), USER_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      case "bottom":
        userPet.classList.add("bottomUserPetAttackAnimation");
        setTimeout( () => userPet.classList.remove("bottomUserPetAttackAnimation"), USER_PET_ATTACK_ANIMATION_TIME_MS);
        break;
      default:
        throw new Error("unknown chosenPointForAttack.bot.position");
    }
    
    this.setState({
      battleState: "user attack calculation"
    });
    this.calculateUserPetAttack(USER_PET_ATTACK_ANIMATION_TIME_MS);
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
     
     if (battleState === "user choosing defense point") {
       const letter = event.key.toUpperCase();
       
       Object.keys(points.user).map( (key, index) => {
         if (letter === points.user[key]) {
           this.setState({
             chosenPointForDefense: {
               bot: null,
               user: {
                 point: letter,
                 position: key
               }
             },
             battleState: "bot pet damage calculation"
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
     timerState: "running"
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
           chosenPointForDefense,
           userPetDamage,
           botPetDamage,
           xpUserWillGet,
           coinsUserWillGet,
           showFinalBattleModal,
           battleState } = this.state;
    
    const { setDefaultCurrentArenaFRAME } = this.props;
    
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
          timelineInlineStyles={ timelineInlineStyles }
          userPetDamage={ userPetDamage }
          botPetDamage={ botPetDamage } 
          xpUserWillGet={ xpUserWillGet }
          coinsUserWillGet={ coinsUserWillGet }
          username={ User.username }
          botname={ Bot.botname }
          showFinalBattleModal={ showFinalBattleModal }
          battleState={ battleState }
          setDefaultCurrentArenaFRAME={ setDefaultCurrentArenaFRAME } />
        
        { User.pet && 
        <Battleground 
          Bot={ Bot }
          User={ User } 
          turn={ turn }
          points={ points }
          chosenPointForAttack={ chosenPointForAttack }
          chosenPointForDefense={ chosenPointForDefense }
          setDefaultCurrentArenaFRAME={ setDefaultCurrentArenaFRAME } /> }
      </div>
    );
  }
}

module.exports = ArenaPVE;