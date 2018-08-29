const React = require("react");

class HitToolTip extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { userPetDamage, botPetDamage } = this.props;
    
    
    if (userPetDamage) {
      const hitToolTipPosition = {
        top: "450px",
        left: "660px"
      };

      return(
        <div className="hitToolTip" style={ hitToolTipPosition } >
          { "-" + userPetDamage }
        </div>
      );  
    }
    else if (botPetDamage) {
      const hitToolTipPosition = {
        top: "450px",
        left: "60px"
      };

      return(
        <div className="hitToolTip" style={ hitToolTipPosition } >
          { "-" + botPetDamage }
        </div>
      );  
    }
  }
}

module.exports = HitToolTip;