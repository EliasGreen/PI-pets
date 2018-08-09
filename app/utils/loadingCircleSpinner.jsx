const React = require("react");
const styles = require("../styles/utils");

const loadingCircleSpinner = (props) => {
  const { target } = props;
  
  if (target === "foodAndWaterCells") {
    return (
      <center id="loadingbox" style={{ transform: "scale(1)", paddingTop: "100px" }}>
        <h2>Loading</h2>
        <div id="out" className="circle">
          <div id="quarterbox">
            <div id="quarter" className="circle"></div>
          </div>
          <div id="in" className="circle"></div>
        </div>
      </center>
    );  
  }
  
  
  return (
    <center id="loadingbox">
      <h2>Loading</h2>
      <div id="out" className="circle">
        <div id="quarterbox">
          <div id="quarter" className="circle"></div>
        </div>
        <div id="in" className="circle"></div>
      </div>
    </center>
  );  
};

module.exports = loadingCircleSpinner;