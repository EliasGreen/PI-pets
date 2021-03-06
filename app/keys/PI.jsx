const React = require("react");
const styles = require("../styles/keys");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.grabKeySound = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2Fgrabkey.mp3?1534433021122");
    this.grabKeySound.volume = 0.3;
    
    this.selectKey = this.selectKey.bind(this);
    this.unselectKey = this.unselectKey.bind(this);
  }
  
  unselectKey(event) {
    if (!this.props.inShop) {
      const el = event.currentTarget;
      el.style.cursor = "cell";
      if (window.getSelection && document.createRange) {
        window.getSelection().removeAllRanges();
      }
    }
  }
  
  selectKey(event) {
    if (!this.props.inShop) {
      this.props.setCurrentPickedKeyNameAndPosition();
      
      this.grabKeySound.currentTime = 0;
      this.grabKeySound.play();

      let sel;
      let range;

      const el = event.currentTarget;
      el.style.cursor = "-webkit-grab";

      if (window.getSelection && document.createRange) {
        sel = window.getSelection();
        if (sel.toString() == "") {
          range = document.createRange();
          range.selectNodeContents(el);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } else if (document.selection) {
          sel = document.selection.createRange();
          if (sel.text == "") { 
            range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
          }
      }
    }
  }
  
  render() {
    // should I delete this???
    //const { ondragstart } = this.props;
    
    const { inShop } = this.props;
    
    let inlineStyle= {};
    
    if (inShop) {
      inlineStyle = { 
        cursor: "default"
      }
    }
    
    return(
      <div className="Keys__PI" onClick={ this.selectKey } onMouseLeave={ this.unselectKey } style={ inlineStyle }>
        3.14
      </div>
    );
  }
}
module.exports = PI;