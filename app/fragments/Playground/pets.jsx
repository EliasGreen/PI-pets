const React = require("react");
const styles = require("../../styles/pets/cat");

const Cat = require("../../pets/cat");

const generateRandomPetColorInRGB = () => {
  return(
    {
      top: ( Math.floor(Math.random() * (255 - 40 + 1)) + 40 ),
      center: ( Math.floor(Math.random() * (200 - 40 + 1)) + 60 ),
      down: ( Math.floor(Math.random() * (255 - 40 + 1)) + 40 ),
      details: ( Math.floor(Math.random() * (255 - 40 + 1)) + 10 )
    } 
  );
}

class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    let cats = [];
    for(let i = 0; i < 10; i++) {
      cats.push(<Cat key={i+"key"} petColors={generateRandomPetColorInRGB()}/>);
    }
    
    return(
      <div className="Playground__frame__pets">
        { cats }
        <Cat />
      </div>
    );
  }
}

module.exports = Pets;