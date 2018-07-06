const React = require("react");
const styles = require("../../styles/IndexPage");
const img_src = "https://cdn.dribbble.com/users/230290/screenshots/1903145/dog_no_211.png";

const Header = () => (
  <div className="IndexPage__header">
    <div className="first_raw_text">Pipets</div>
    <div className="second_raw_text">Online Web-Game</div>
    <img src={img_src} className="logo"></img>
  </div>
);

module.exports = Header;