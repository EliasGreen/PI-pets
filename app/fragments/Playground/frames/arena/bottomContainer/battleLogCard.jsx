const React = require("react");
const styles = require("../../../../../styles/Playground");

const generatePetComponentByItsType = require("../../../../../functions/generatePetComponentByItsType");

const battleLogCard = ({ battleLog }) => {
  const battleDate = new Date(battleLog.date);
  const battleDateVisualisation = `${battleDate.getFullYear()}/${battleDate.getMonth()}/${battleDate.getDay()} ${battleDate.getHours()}:${battleDate.getMinutes()}`;
  
  const UserPetComponent = generatePetComponentByItsType(battleLog.userPet.type);
  const EnemyPetComponent = generatePetComponentByItsType(battleLog.enemy.pet.type);
  
  switch (battleLog.type) {
    case "PVE":
      return(
        <div className="battleLogCard">
          <h2>{ battleLog.type }</h2>
          <div className="opponentsContainer">
            <div className="userPet">
              <UserPetComponent pet={ battleLog.userPet } showMode={ true } />
              { battleLog.userPet.nickname }
            </div>
            <p> VS </p>
            <div className="enemyPet">
              <EnemyPetComponent pet={ battleLog.enemy.pet } showMode={ true } />
              { battleLog.enemy.pet.nickname }
            </div>
          </div>
          <h4> Status: { battleLog.status } </h4>
          <h5>{ battleDateVisualisation }</h5>
        </div>);
      
    case "PVP":
      return(
        <div className="battleLogCard">
          {
            // TODO 
          }
        </div>);
      
    default:
      throw new Error("unknown battleLog type");
  };   
}

module.exports = battleLogCard;