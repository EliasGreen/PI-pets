const React = require("react");

class Dots extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return(
      <ul className="userDefenseDots">
        <li className="userDotFirst"></li>
        <li className="userDotSecond"></li>
        <li className="userDotThird"></li>
      </ul>
    );
  }
}

module.exports = Dots;