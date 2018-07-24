const React = require("react");
const styles = require("../../../styles/pets/cat");

const Cat = require("../../../pets/cat");

const generateRandomPetColorInRGB = () => {
  return(
    {
      top: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40})`,
      center: `rgb(${Math.floor(Math.random() * (200 - 40 + 1)) + 60},${Math.floor(Math.random() * (200 - 40 + 1)) + 60},${Math.floor(Math.random() * (200 - 40 + 1)) + 60})`,
      down: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40})`,
      details: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 10},${Math.floor(Math.random() * (255 - 40 + 1)) + 10},${Math.floor(Math.random() * (255 - 40 + 1)) + 10})`
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
      let newGeneratedPerColorsInRGB = generateRandomPetColorInRGB();
      cats.push(<Cat key={i+"key"} petColors={newGeneratedPerColorsInRGB}/>);
    }
    
    return(
      <div className="Playground__frame__pets">
        { cats }
      </div>
    );
  }
}

module.exports = Pets;