const React = require("react");

const battleLogCardPVE = ({ battleLog, battleDateVisualisation, UserPetComponent, EnemyPetComponent }) => {
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
}

module.exports = battleLogCardPVE;