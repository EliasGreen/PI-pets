const React = require("react");


class Dots extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return(
      <ul className="botDefenseDots">
        <li className="botDotFirst"></li>
        <li className="botDotSecond"></li>
        <li className="botDotThird"></li>
      </ul>
    );
  }
}

module.exports = Dots;