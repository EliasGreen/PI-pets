const React = require("react");

class Dots extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { userPoints, userChosenPointForDefense } = this.props;
    
    if (userPoints) {
      const { top, middle, bottom } = userPoints;
      
      let topDotStyle = {};
      let middleDotStyle = {};
      let bottomDotStyle = {};
      
       if (userChosenPointForDefense) {
        switch (userChosenPointForDefense.position) {
          case "top":
            topDotStyle.background = "yellow";
            break;
          case "middle":
            middleDotStyle.background = "yellow";
            break;
          case "bottom":
            bottomDotStyle.background = "yellow";
            break;
          case "placeholer-plug":
            // do nothing
            break;
          default:
            throw new Error("unknown dot position");
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