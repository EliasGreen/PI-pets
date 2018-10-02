const React = require("react");

const imgs = [
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FfS.png?1537285465736",
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FsS.png?1537285769808",
  "https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2FtS.png?1537285772347"
];

const Dots = ({ imgSrc, changeSliderImgByClicking }) => (
   <div className="dots">
     <div className={ imgSrc === imgs[0] ? "dot_active" : "dot" } onClick={ () => { changeSliderImgByClicking(0) } }></div>
     <div className={ imgSrc === imgs[1] ? "dot_active" : "dot" } onClick={ () => { changeSliderImgByClicking(1) } }></div>
     <div className={ imgSrc === imgs[2] ? "dot_active" : "dot" } onClick={ () => { changeSliderImgByClicking(2) } }></div>
   </div>
);

module.exports = Dots;