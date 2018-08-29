const React = require("react");

class FinalModal extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { battleState, xpUserWillGet, coinsUserWillGet, username, botname, setDefaultCurrentArenaFRAME } = this.props;
    const whoWon = battleState === "user have won" ? username : botname;
    return(
      <div className="finalModal">
        <div className="inner">
          <h1>{ whoWon } - winner!</h1>
          <p> You got { xpUserWillGet } XP points and { coinsUserWillGet } coins </p>
          <button onClick={ setDefaultCurrentArenaFRAME }> back to arena </button>
        </div>
      </div>
    );
  }
}

module.exports = FinalModal;