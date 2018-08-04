const React = require("react");
const styles = require("../styles/utils");

const InventoryTooltip = (props) => {
  const display = props.tooltip.show === true ? "block" : "none";
  
  return(
    <div className="inventoryTooltip" style={{ display: display, left: props.tooltip.coordinates.left, top: props.tooltip.coordinates.top }}>
      { props.tooltip.text }
    </div>
  );
};

module.exports = InventoryTooltip;