const React = require("react");
const styles = require("../../../../../styles/Playground");

const generatePetComponentByItsType = require("../../../../../functions/generatePetComponentByItsType");

const BattleLogCardPVE = require("./battleLogCard/pve");

const battleLogCard = ({ battleLog }) => {
  const battleDate = new Date(battleLog.date);
  const battleDateVisualisation = `${battleDate.getFullYear()}/${battleDate.getMonth()}/${battleDate.getDay()} ${battleDate.getHours()}:${battleDate.getMinutes()}`;
  
  const UserPetComponent = generatePetComponentByItsType(battleLog.userPet.type);
  const EnemyPetComponent = generatePetComponentByItsType(battleLog.enemy.pet.type);
  
  switch (battleLog.type) {
    case "PVE":
      return <BattleLogCardPVE 
               battleLog={battleLog} 
               battleDateVisualisation={battleDateVisualisation} 
               UserPetComponent={UserPetComponent} 
               EnemyPetComponent={EnemyPetComponent}/>;
      
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