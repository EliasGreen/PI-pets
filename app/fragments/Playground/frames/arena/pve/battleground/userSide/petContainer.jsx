const React = require("react");

const generatePetComponentByItsType =  require("../../../../../../../functions/generatePetComponentByItsType");

class PetContainer extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { User } = this.props;
    const UserPetComponent = generatePetComponentByItsType(User.pet.type);
    
    return(
      <div className="petContainer left">
        <p className="playerName">{ User.username }</p>
        <div className="petComponentWrapper">
          <UserPetComponent pet={ User.pet } showMode={ true } />
        </div>
        <p className="petNickname">{ User.pet.nickname }</p>
      </div>
    );
  }
}

module.exports = PetContainer;