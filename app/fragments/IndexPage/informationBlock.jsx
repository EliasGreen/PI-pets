const React = require("react");

const infoText = `
Do you love math? And pets? 
Have you ever wanted to have a nice pet?
Or maybe just a good mark for math?
So if your answer - yes, this game is for you!

Key gameplay features:
- get your own pet!
- collect new pets!
- practice and improve your skills in math!
- feed your pet in real-time to keep it alive!
- and so on!\n
`;

const InformationBlock = () => (
  <div className="IndexPage__informationBlock">
    {infoText}
  </div>
);

module.exports = InformationBlock;