const React = require("react");

const imgs = [
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FfS.png?1537285465736",
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FsS.png?1537285769808",
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FtS.png?1537285772347"
];

const Dots = require("./slider/dots");

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMF6zbf3YKRYcDbbeVGcovP3zW0gkBHI_qrTGhepauGH26qfo3",
      timeToChange: 0
    }
    
    this.increaseTimeToChange = this.increaseTimeToChange.bind(this);
    this.changeSliderImgByClicking = this.changeSliderImgByClicking.bind(this);
    this.changeSliderImgByTick = this.changeSliderImgByTick.bind(this);
    this.checkTimeInDiapazone1__5 = this.checkTimeInDiapazone1__5.bind(this);
    this.checkTimeInDiapazone6__10 = this.checkTimeInDiapazone6__10.bind(this);
    this.checkTimeInDiapazone11__15 = this.checkTimeInDiapazone11__15.bind(this);
  }
  
  
  increaseTimeToChange() {
    if (this.state.timeToChange !== 16) {
      this.setState({
        timeToChange: this.state.timeToChange + 1
      });
    }
    else {
      this.setState({
        timeToChange: 0
      });
    }
  }
  
  
  checkTimeInDiapazone1__5(time) {
    if (time > 0 && time <= 5) {
      return true;
    }
    else {
      return false; 
    }
  }
  
  checkTimeInDiapazone6__10(time) {
    if (time > 5 && time <= 10) {
      return true;
    }
    else {
      return false; 
    }
  }
  
  checkTimeInDiapazone11__15(time) {
    if (time > 10 && time <= 16) {
      return true;
    }
    else {
      return false; 
    }
  }
  
  changeSliderImgByClicking(dotPosition) {
    switch(dotPosition) {
      case 0:
        this.setState({
          imgSrc: imgs[0],
          timeToChange: 1
        });
        break;
      case 1:
        this.setState({
          imgSrc: imgs[1],
          timeToChange: 6
        });
        break;
      case 2:
        this.setState({
          imgSrc: imgs[2],
          timeToChange: 11
        });
        break;
      default:
        console.log("ERROR: INVALID DATA: " + dotPosition);
        this.forceUpdate();
        break;
     }
  }
  
  changeSliderImgByTick() {
    const { timeToChange } = this.state;
    
    if (this.checkTimeInDiapazone1__5(timeToChange)) {
      this.setState({
        imgSrc: imgs[0]
      });
    }
    else if (this.checkTimeInDiapazone6__10(timeToChange)) {
      this.setState({
        imgSrc: imgs[1]
      });      
    }
    else if (this.checkTimeInDiapazone11__15(timeToChange)) {
      this.setState({
        imgSrc: imgs[2]
      });
    }
  }
  
  componentDidMount() {
    this.startUpdatingSlider = setInterval(() => {
      this.increaseTimeToChange();
      this.changeSliderImgByTick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.startUpdatingSlider);
  }
  
  render() {
    const { imgSrc } = this.state;
    
    return (
      <div className="IndexPage__slider">
        <img src={ imgSrc } className="sliderImg"></img>
        <Dots imgSrc={ imgSrc } changeSliderImgByClicking={ this.changeSliderImgByClicking } />
      </div>
    );
  }
}

module.exports = Slider;