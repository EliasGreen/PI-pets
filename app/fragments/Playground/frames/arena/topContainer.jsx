const React = require("react");
const styles = require("../../../../styles/Playground");

const TopContainer = ({ choosingError, changeCurrentArenaFRAME }) => {
  return(
    <div className="topContainer">
      <button className="buttonPVP" onClick={ () => {changeCurrentArenaFRAME("PVP")} }> PVP </button>
      <button className="buttonPVE" onClick={ () => {changeCurrentArenaFRAME("PVE")} }> PVE </button>
      <p> Prepare for battle! </p>
      { choosingError && <p>{ choosingError }</p> }
    </div>
  );    
}

module.exports = TopContainer;