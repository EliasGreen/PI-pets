const React = require("react");
const styles = require("../../styles/IndexPage");

const imgs = [
  "src1",
  "src2",
  "src3"
]

class Slider extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     imgSrc: "LINK",
     timeToChange: 0
   }
  }
  
  
//   increaseTimeToChange = () => {
//    if (this.timeToChange !== 0) {
//       this.setState({
         
//       });
//     }
      
//    else {
      
//     }
//   }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  render() {
    const { imgSrc } = this.state;
    
    return (
      <div className="IndexPage__slider">
        <img src={ imgSrc }></img>
      </div>
    );
  }
}

module.exports = Slider;