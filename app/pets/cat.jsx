const React = require("react");
const styles = require("../styles/pets/cat");


/*
* The VISUALISATION of CAT pet via SVG
*/
class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    const { petColors, opacity, inModal } = this.props;
    
    let petClassName = "Pets__cat";
    if (inModal) {
     petClassName = "petInModal"
    }
    
    return(
      <div className={ petClassName }>
        <svg width="120pt" height="90pt" viewBox="0 0 120 90">
          <g xmlns="http://www.w3.org/2000/svg" id="surface1" style={{ opacity: opacity }}>
            <path className="leftCatEar" style={{fillRule:"nonzero", fill: petColors.top, fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1", strokeMiterlimit:"4"}} d="M 104.5 53.5 L 146 179 L 217 115 Z M 104.5 53.5 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="rightCatEar" style={{fillRule:"nonzero", fill: petColors.top, fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1", strokeMiterlimit:"4"}} d="M 395.253883 50.257376 L 436.746445 175.747539 L 507.753724 111.7492 Z M 395.253883 50.257376 " transform="matrix(0.0682651,0.174631,-0.174631,0.0682651,73.567918,-65.372535)"/>
            <path style={{fillRule:"nonzero", fill: petColors.center, fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1", strokeMiterlimit:"4"}} d="M 522.166667 250.75 C 522.166667 154.9375 429.708333 77.25 315.666667 77.25 C 201.625 77.25 109.166667 154.9375 109.166667 250.75 C 109.166667 346.5625 201.625 424.25 315.666667 424.25 C 429.708333 424.25 522.166667 346.5625 522.166667 250.75 Z M 522.166667 250.75 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="leftCatPaw" style={{fillRule:"nonzero", fill: petColors.down, fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1", strokeMiterlimit:"4"}} d="M 285.5 392 C 285.5 372.9375 260.208333 357.5 229 357.5 C 197.791667 357.5 172.5 372.9375 172.5 392 C 172.5 411.0625 197.791667 426.5 229 426.5 C 260.208333 426.5 285.5 411.0625 285.5 392 Z M 285.5 392 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="rightCatPaw" style={{fillRule:"nonzero", fill: petColors.down, fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1", strokeMiterlimit:"4"}} d="M 455 391 C 455 371.9375 429.708333 356.5 398.5 356.5 C 367.291667 356.5 342 371.9375 342 391 C 342 410.0625 367.291667 425.5 398.5 425.5 C 429.708333 425.5 455 410.0625 455 391 Z M 455 391 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path style={{fill:"none", strokeWidth: "6", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity: "1", strokeMiterlimit: "4"}} d="M 279.5 294.5 L 304.5 294.5 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="leftCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 257.0625 362.4375 L 244.5625 397.0625 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="leftCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 235.9375 358.5625 L 227.8125 379.3125 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="rightCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 365.375 363.625 L 375.375 386.875 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="rightCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 382.625 357.875 L 389.625 373.125 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="rightCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 373.125 360.375 L 387.125 391.875 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="leftCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 242.875 359.125 L 229.375 399.875 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path className="leftCatPaw" style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 269.875 367.375 L 265.375 381.125 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"6", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}}d="M 227 211.666667 L 257 177.666667 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"6", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 284.420339 213.420011 L 261.746282 172.080231 " transform="matrix(0.174636,-0.0682523,0.0682523,0.174636,-9.642799,21.117992)"/>
            <path style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"6", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 316.458333 209.75 L 346.458333 175.75 " transform="matrix(0.1875,0,0,0.1875,0,0)"/>
            <path style={{fillRule: "nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:"1", strokeWidth:"6", strokeLinecap:"butt", strokeLinejoin:"miter", stroke:"rgb(33.72549%,32.941176%,33.72549%)", strokeOpacity:"1",strokeMiterlimit:"4"}} d="M 373.711907 211.753201 L 351.03785 170.41342 " transform="matrix(0.174636,-0.0682523,0.0682523,0.174636,-8.380407,27.19093)"/>
          </g>
        </svg>
      </div>
    );
  }
}

module.exports = Cat;