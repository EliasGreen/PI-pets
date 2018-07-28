const React = require("react");
const styles = require("../styles/boxes");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.allowDrop = this.allowDrop.bind(this);
    this.dropKey = this.dropKey.bind(this);
  }
  
  allowDrop(ev) {
    ev.preventDefault();
  }
  
  dropKey(ev) {
    const { setCurrentPickedBoxNameAndPosition, toggleShowBoxOpenModal } = this.props;
    
    setCurrentPickedBoxNameAndPosition();
    toggleShowBoxOpenModal();
  }
  
  render() {
    const { dropkey } = this.props;
    return(
      <div className="Boxes__PI" onDrop={ this.dropKey } onDragOver={ this.allowDrop }>
        3.14
      </div>
    );
  }
}
module.exports = PI;