const React = require("react");

const UserCountContainer = (props) => (
  <div className="IndexPage__userCountContainer">
    <p> total users: {props.usersCount.total}</p>
    <p> online users: {props.usersCount.online}</p>
  </div>
);

module.exports = UserCountContainer;