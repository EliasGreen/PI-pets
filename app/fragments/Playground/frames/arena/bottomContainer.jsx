const React = require("react");
const styles = require("../../../../styles/Playground");

const BottomContainer = ({ petArenaCards }) => {
  return(
    <div className="bottomContainer">
      <div className="floatLeftContainter">
        <h1 className="lastArenaBattlesLogsHeader">Last 10 battles' logs:</h1>
        <div className="lastArenaBattlesLogsContainer"></div>
      </div>


      <div className="floatRightContainter">
        <h1 className="chooserOfPetForArenaBattleHeader">Choose a pet for battle:</h1>
        <div className="chooserOfPetForArenaBattleContainer">
          { petArenaCards }
        </div>
      </div>
    </div>
  );    
}

module.exports = BottomContainer;