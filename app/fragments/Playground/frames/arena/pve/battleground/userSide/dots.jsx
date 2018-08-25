const React = require("react");

class Dots extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { userPoints, userChosenPoint } = this.props;
    
    if (userPoints) {
      const { top, middle, bottom } = userPoints;
      
      let topDotStyle = {};
      let middleDotStyle = {};
      let bottomDotStyle = {};
      
      if (userChosenPoint) {
        switch (userChosenPoint.position) {
          case "top":
            topDotStyle = { color: "#ff4053" }
            break;
          case "middle":
            middleDotStyle = { color: "#ff4053" }
            break;
          case "bottom":
            bottomDotStyle = { color: "#ff4053" }
            break;
          default:
            throw new Error("unknown dot positon");
        };
      }
      
      return(
        <ul className="userDefenseDots">
          <li className="userDotFirst" style={topDotStyle} >{ top }</li>
          <li className="userDotSecond" style={middleDotStyle} >{ middle }</li>
          <li className="userDotThird" style={bottomDotStyle} >{ bottom }</li>
        </ul>
      );
    }
    else {
      return(
        <ul className="userDefenseDots">
          <li className="userDotFirst"></li>
          <li className="userDotSecond"></li>
          <li className="userDotThird"></li>
        </ul>
      );
    }
  }
}

module.exports = Dots;