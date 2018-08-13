const React = require("react");
const styles = require("../styles/water");

class Bottle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { inShop } = this.props;
    
    let inlineStyle= {};
    
    if (inShop) {
      inlineStyle = { 
        transform: "scale(0.35)",
        transformOrigin: "215px 130px",
        margin: "-95px"
      }
    }
    
    return(
      <div className="WATER__bottle" style={inlineStyle}>
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