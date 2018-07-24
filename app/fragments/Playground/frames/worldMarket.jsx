const React = require("react");
const styles = require("../../../styles/Playground");

class WorldMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return(
      <div className="Playground__frame__worldMarket">
        WorldMarket
      </div>
    );
  }
}

module.exports = WorldMarket;