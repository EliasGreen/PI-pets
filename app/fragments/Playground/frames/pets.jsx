const React = require("react");
const styles = require("../../../styles/pets/cat");

const PetInterfaceModal = require("../../../utils/petInterfaceModal");
const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const Cat = require("../../../pets/cat");
const Dog = require("../../../pets/dog");

class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      pets: [],
      petForPetInterfaceModal: "",
      showPetInterfaceModal: false
    }
    this.getDataFromUserPets = this.getDataFromUserPets.bind(this);
    this.compilePetsIntoComponents = this.compilePetsIntoComponents.bind(this);
    this.setPetForPetInterfaceModal = this.setPetForPetInterfaceModal.bind(this);
    this.toggleShowPetInterfaceModal = this.toggleShowPetInterfaceModal.bind(this);
  }
  
  toggleShowPetInterfaceModal() {
   this.setState({
     showPetInterfaceModal: !this.state.showPetInterfaceModal
   });
  }
  
  setPetForPetInterfaceModal(petForPetInterfaceModal) {
    this.setState({ petForPetInterfaceModal });
  }
  
  compilePetsIntoComponents(pets) {
    
    if (pets.length === 0) {
     return <div className="emptyPetsFrame"> Looks like you don't have any PI pets - open PI box to get one of them!</div>;
    }
       
    const petComponents = {
      "Cat": Cat,
      "Dog": Dog
    }
    
    return pets.map( pet => {
      const PetComponent = petComponents[pet.type];
      const opacity = pet.alive === true ? 1 : 0.4;
      return( <PetComponent 
                 pet={pet} 
                 opacity={opacity} 
                 key={pet._id} 
                 setPetForPetInterfaceModal={ this.setPetForPetInterfaceModal }
                 toggleShowPetInterfaceModal={ this.toggleShowPetInterfaceModal }
               /> );
    });
  }
  
   async getDataFromUserPets() {
    this.setState({
      loading: true 
    });
   
    try {
      const response = await fetch("/user/pets", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        pets: result.pets,
        loading: false
      });
    } 
    catch(loadingError) {
      this.setState({
        loadingError,
        loading: false
      });
    }
  }
  
  componentDidMount() {
    this.getDataFromUserPets();
  }
  
  render() {
    const { pets, loading, loadingError, petForPetInterfaceModal, showPetInterfaceModal } = this.state;
    
    const petsInComponents = this.compilePetsIntoComponents(pets);
    
    if (loadingError) {
      return(
        <div className="Playground__frame__pets">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__pets">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    
    return(
      <div className="Playground__frame__pets">
        { petsInComponents }
        
        { showPetInterfaceModal && <PetInterfaceModal pet={ petForPetInterfaceModal } toggleShowPetInterfaceModal={ this.toggleShowPetInterfaceModal } /> }
      </div>
    );
  }
}

module.exports = Pets;