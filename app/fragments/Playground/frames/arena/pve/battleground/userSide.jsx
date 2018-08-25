const React = require("react");

const generatePetComponentByItsType =  require("../../../../../../functions/generatePetComponentByItsType");

const Dots = require("./userSide/dots");
const PetContainer = require("./userSide/petContainer");

class UserSide extends React.Component {
 constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { User, styleForUserName, userPoints } = this.props;
    const UserPetComponent = generatePetComponentByItsType(User.pet.type);
    
    return(
      <div className="userSide">
        <PetContainer User={ User } styleForUserName={ styleForUserName } />
        <Dots userPoints={ userPoints } />
      </div>
    );
  }
}

module.exports = UserSide;