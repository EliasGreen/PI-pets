const React = require("react");


class Dots extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { botPoints, botChosenPoint } = this.props;
    if (botPoints) {
      const { top, middle, bottom } = botPoints;
      
      let topDotStyle = {};
      let middleDotStyle = {};
      let bottomDotStyle = {};
      
      if (botChosenPoint) {
        switch (botChosenPoint.position) {
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
        <ul className="botDefenseDots">
          <li className="botDotFirst" style={ topDotStyle } >{ top }</li>
          <li className="botDotSecond" style={ middleDotStyle } >{ middle }</li>
          <li className="botDotThird" style={ bottomDotStyle } >{ bottom }</li>
        </ul>
      );
    }
    else {
      return(
        <ul className="botDefenseDots">
          <li className="botDotFirst"></li>
          <li className="botDotSecond"></li>
          <li className="botDotThird"></li>
        </ul>
      );
    }
  }
}

module.exports = Dots;