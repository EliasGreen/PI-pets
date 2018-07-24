const React = require("react");
const styles = require("../../../styles/Playground");

class UsersTOP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return(
      <div className="Playground__frame__usersTOP">
        UsersTOP
      </div>
    );
  }
}

module.exports = UsersTOP;