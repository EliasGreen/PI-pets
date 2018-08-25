const React = require("react");

class Timeline extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { timelineInlineStyles } = this.props;
    return(
      <div className="timeline">
        <div className="inner" style={timelineInlineStyles}></div>
      </div>
    );
  }
}

module.exports = Timeline;