const React = require("react");
const styles = require("../styles/boxes");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.dropKeyOnBoxSound = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2Fboxopen.wav?1534433845486");
    this.dropKeyOnBoxSound.volume = 0.3;
    
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
      
      this.dropKeyOnBoxSound.currentTime = 0;
      this.dropKeyOnBoxSound.play();

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