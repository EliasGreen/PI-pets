const React = require("react");
const styles = require("../../../styles/Playground");

class IngameShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return(
      <div className="Playground__frame__ingameShop">
        IngameShop
      </div>
    );
  }
}

module.exports = IngameShop;