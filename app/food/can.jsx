const React = require("react");
const styles = require("../styles/food");

class Can extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return(
      <div className="FOOD__can"></div>
    );
  }
}
module.exports = Can;