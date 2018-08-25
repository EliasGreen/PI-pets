const React = require("react");

class Round extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { round } = this.props;
    return(
      <div className="round">
        { `Round: ${round}` }
      </div>
    );
  }
}

module.exports = Round;