const React = require("react");
const styles = require("../../styles/IndexPage");

const infoText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus consequat placerat laoreet. In lobortis viverra 
    odio, pulvinar facilisis tortor tempus at. Duis tincidunt a
    c lorem sed auctor. Maecenas facilisis vehicula efficitur. 
    In eu placerat velit, eu finibus velit. Fusce eget mollis el
    it. Duis eleifend tempor tellus, iaculis feugiat ex fermentu
    m nec. Duis ullamcorper diam a lacus feugiat dignissim. Int
    eger vitae nisi eget tellus placerat feugiat vitae a libero.
    In a leo elit. Mauris pharetra nisl odio, sed ultricies magn
    a venenatis a.` ;

const InformationBlock = () => (
  <div className="IndexPage__informationBlock">
    {infoText}
  </div>
);

module.exports = InformationBlock;