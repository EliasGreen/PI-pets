const React = require("react");
const styles = require("../../../../styles/Playground");

const Cat = require("../../../../pets/cat");
const Dog = require("../../../../pets/dog");

class ArenaPVP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return(
      <div className="ArenaPVPcontainer">
        pvp
      </div>
    );
  }
}

module.exports = ArenaPVP;