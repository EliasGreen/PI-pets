const React = require("react");
const styles = require("../styles/water");

class Bottle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return(
      <div className="WATER__bottle">
          <div className="cap">
              <div className="cap-top">
              </div>
              <div className="cap-seal">
              </div>
          </div>
         <div className="bottle">
              <div className="water-full"> </div>
          </div>
      </div>
    );
  }
}
module.exports = Bottle;