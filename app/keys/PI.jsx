const React = require("react");
const styles = require("../styles/keys");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return(
      <div className="Keys__PI" draggable="true">
        3.14
      </div>
    );
  }
}
module.exports = PI;