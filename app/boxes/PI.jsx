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
    if (!this.props.inShop) {
      ev.preventDefault();
    }
  }
  
  dropKey(ev) {
    if (!this.props.inShop) {
      const { setCurrentPickedBoxNameAndPosition, toggleShowBoxOpenModal } = this.props;

      setCurrentPickedBoxNameAndPosition();
      toggleShowBoxOpenModal();
    }
  }
  
  render() {
    // delete???
    //const { dropkey } = this.props;
    return(
      <div className="Boxes__PI" onDrop={ this.dropKey } onDragOver={ this.allowDrop }>
        3.14
      </div>
    );
  }
}
module.exports = PI;