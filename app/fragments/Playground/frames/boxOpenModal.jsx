const React = require("react");
const styles = require("../../../styles/Playground");

class BoxOpenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    const { toggleShowBoxOpenModal } = this.props;
    return(
      <div className="Playground__frames__BoxOpenModal">
        Playground__frames__BoxOpenModal
        <button onClick={ toggleShowBoxOpenModal }> Cancel </button>
      </div>
    );
  }
}

module.exports = BoxOpenModal;