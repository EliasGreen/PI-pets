const React = require("react");
const styles = require("../../styles/Playground");

const Pets = require("./pets");

const Frame = () => (
  <div className="Playground__frame">
    <Pets />
  </div>
);

module.exports = Frame;