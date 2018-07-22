const React = require("react");
const styles = require("../../styles/Playground");

const Cat = require("../../pets/cat");

const Pets = () => (
  <div className="Playground__frame__pets">
    <Cat />
  </div>
);

module.exports = Pets;