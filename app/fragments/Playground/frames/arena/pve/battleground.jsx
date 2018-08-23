const React = require("react");

const UserSide = require("./battleground/userSide");
const BotSide = require("./battleground/botSide");

class Battleground extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { User, Bot } = this.props;
    
    return(
      <div className="battleground">
        <UserSide User={ User }/>
        <BotSide Bot={ Bot }/>
      </div>
    );
  }
}

module.exports = Battleground;