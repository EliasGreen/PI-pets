const React = require("react");
const styles = require("../styles/boxes");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return(
      <div className="Boxes__PI">
        3.14
      </div>
    );
  }
}
module.exports = PI;