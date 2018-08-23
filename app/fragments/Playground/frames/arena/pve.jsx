const React = require("react");
const styles = require("../../../../styles/PVE");

const generateNewPet =  require("../../../../functions/generateNewPet");
const generateName =  require("../../../../functions/generateName");
const generateLVL =  require("../../../../functions/generateLVL");

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
      User: {
      },
      creatingBattleLogError: null,
      gettingUserPetError: null
    }
    
    this.createBattleLogInDB = this.createBattleLogInDB.bind(this);
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
      .then(() => this.createBattleLogInDB());
  }
  
  render() {
    const { Bot, User, gettingUserPetError } = this.state;
    
    if(gettingUserPetError) {   
      return(
        <div className="ArenaPVEcontainer">
          Your chosen pet for battle is dead or server doesn't response
        </div>
      );
    }
    
    return(
      <div className="ArenaPVEcontainer">
        <Interface />
        { User.pet && 
        <Battleground 
          Bot={ Bot }
          User={ User } /> }
      </div>
    );
  }
}

module.exports = ArenaPVE;