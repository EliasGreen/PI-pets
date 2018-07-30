const React = require("react");
const styles = require("../styles/keys");

class PI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectKey = this.selectKey.bind(this);
    this.unselectKey = this.unselectKey.bind(this);
  }
  
  unselectKey(event) {
    const el = event.currentTarget;
    el.style.cursor = "cell";
    if (window.getSelection && document.createRange) {
      window.getSelection().removeAllRanges();
    }
  }
  
  selectKey(event) {
    this.props.setCurrentPickedKeyNameAndPosition();
    
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
  
  render() {
    const { ondragstart } = this.props;
    return(
      <div className="Keys__PI" onClick={ this.selectKey } onMouseLeave={ this.unselectKey } >
        3.14
      </div>
    );
  }
}
module.exports = PI;