const React = require("react");

class RunFromBattleButton extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { Bot, styleForBotName, botPoints, botChosenPointForAttack, botChosenPointForDefense, setDefaultCurrentArenaFRAME } = this.props;
    
    const handleLeavingPVEbattle = async () => {
      setDefaultCurrentArenaFRAME();
      
      const data = {
        newBattleLogStatus: "user ran from battle"
      }

      const options = { 
        method: "put", 
        credentials: "include",
        headers: { "Content-Type": "application/json", "Accept":"application/json" }, 
        body: JSON.stringify(data)
      };
      
      await fetch("user/battles/logs", options);
    }
    
    return(
      <button onClick={ handleLeavingPVEbattle }>
        run from battle
      </button>
    );
  }
}

module.exports = RunFromBattleButton;