const React = require("react");
const styles = require("../styles/pets/dog");


/*
* The VISUALISATION of DOG pet via SVG
*/
class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    
    this.dogSound = new Audio("https://cdn.glitch.com/9baded2b-bdfd-45e5-891f-0dfd4e93b84e%2Fpup2.mp3?1534432035982");
    this.dogSound.volume = 0.2;
    
    this.setYourselfForPetInterfaceModal = this.setYourselfForPetInterfaceModal.bind(this);
  }
  
  setYourselfForPetInterfaceModal() {
    const { toggleShowPetInterfaceModal, setPetForPetInterfaceModal, pet, showMode } = this.props;
    
    this.dogSound.play();
    
    if (showMode) {
      return;
    }

    setPetForPetInterfaceModal(pet);
    toggleShowPetInterfaceModal();
  }
  
  render() {
    const { pet, opacity, inModal } = this.props;
    
    let petClassName = "Pets__dog";
    if (inModal) {
     petClassName = "petInModal"
    }
    
    return(
      <div className={ petClassName }>
        <svg width="120px" height="90px" viewBox="-0.0175644 0 120.035 90" preserveAspectRatio="none meet">
          <rect id="svgEditorBackground" x="0" y="0" width="120" height="90" style={{fill: "none", stroke: "none"}}/>
          <g xmlns="http://www.w3.org/2000/svg" id="e8_group" style={{ opacity: opacity }} transform="matrix(0.581593 0 0 0.581593 -231.514 -175.437)" onClick={ this.setYourselfForPetInterfaceModal }>
            <rect x="432.3530946101933" y="328.70596378310137" style={{fill: pet.petColors.center, stroke: "black", strokeWidth: "1px"}} id="e1_rectangle" width="142" height="107" rx="0" ry="0"/>
            <rect className="rightDogPaw" x="531.3382568359375" y="422.5716247558594" style={{fill: pet.petColors.down, stroke: "black", strokeWidth: "1px"}} id="e3_rectangle" width="60" height="25"/>
            <rect className="leftDogPaw" x="412.3384094238281" y="422.5716247558594" style={{fill: pet.petColors.down, stroke: "black", strokeWidth: "1px"}} id="e2_rectangle" width="60" height="25"/>
            <rect x="465.33838513753705" y="374.57156436903887" style={{fill: pet.petColors.details, stroke: "black", strokeWidth: "1px"}} id="e4_rectangle" width="30" height="20" rx="0" ry="0"/>
            <rect x="513.3383241023807" y="373.57156436903887" style={{fill: pet.petColors.details, stroke: "black", strokeWidth: "1px"}} id="e5_rectangle" width="30" height="20" rx="0" ry="0"/>
            <polygon style={{fill: pet.petColors.details, stroke: "black", strokeWidth: "1px"}} id="e6_polygon" points="501.253 402.821 502.253 418.321 513.753 427.821 524.253 418.821 525.253 402.321" transform="matrix(0.724884 0 0 0.724884 131.613 113.56)"/>
            <rect className="dogEye" x="477.83838513753705" y="381.57156436903887" style={{fill: pet.petColors.center, stroke: "black", strokeWidth: "1px"}} id="e7_rectangle" width="15" height="10" rx="0" ry="0"/>
            <rect className="dogEye" x="525.3383546199589" y="381.07156436903887" style={{fill: pet.petColors.center, stroke: "black", strokeWidth: "1px"}} id="e6_rectangle" width="15" height="10" rx="0" ry="0"/>
            <polygon className="rightDogEar" style={{fill: pet.petColors.top, stroke: "black", strokeWidth: "1px"}} id="e1_polygon" points="622.552 309.435 625.742 296.965 640.605 294.689 644.051 308.468 631.479 317.265" transform="matrix(1.69327 0 0 1.69327 -496.944 -191.769)"/>
            <polygon className="leftDogEar" style={{fill: pet.petColors.top, stroke: "black", strokeWidth: "1px"}} id="e14_polygon" points="530.016 322.855 510.993 314.352 513.163 293.829 534.856 296.502 540.529 313.629" transform="matrix(1.26055 0 0 1.26055 -233.322 -63.0822)"/>
          </g>
        </svg>
      </div>
    );
  }
}

module.exports = Dog;