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
    this.resetPetForPetInterfaceModal = this.resetPetForPetInterfaceModal.bind(this);
    this.toggleShowPetInterfaceModal = this.toggleShowPetInterfaceModal.bind(this);
    this.deletePetFromPets = this.deletePetFromPets.bind(this);
  }
  
  toggleShowPetInterfaceModal() {
   this.setState({
     showPetInterfaceModal: !this.state.showPetInterfaceModal
   });
  }
  
  deletePetFromPets(petId) {
    let { pets } = this.state;
    
    const indexOfUtilizedPet = pets.findIndex(item => item._id == petId);
    pets.splice(indexOfUtilizedPet, 1);
    
    this.setState({ pets });
  }
  
  setPetForPetInterfaceModal(petForPetInterfaceModal) {
    this.setState({ petForPetInterfaceModal });
  }
  
  resetPetForPetInterfaceModal() {
    const { pets, petForPetInterfaceModal} = this.state;
    const updatedPetForPetInterfaceModal = pets.find(pet => pet.id === petForPetInterfaceModal.id);
    
    this.setState({
      petForPetInterfaceModal: updatedPetForPetInterfaceModal
    });
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
  
  async getDataFromUserPets(updatingBehindTheScene) {
    if (!updatingBehindTheScene) {
      this.setState({
        loading: true
      });
    }
   
    try {
      const response = await fetch("/user/pets", { method: "get", credentials: "include", headers: { "Content-Type": "application/json", "Accept":"application/json" } });
      const result = await response.json();
      
      this.setState({
        pets: result.pets,
        loading: false
      });
      
      if (updatingBehindTheScene) {
        this.resetPetForPetInterfaceModal();
      }
    } 
    catch(loadingError) {
      this.setState({
        loadingError,
        loading: false
      });
    }
  }
  
  componentDidMount() {
    const { socket } = this.props;
    
    this.getDataFromUserPets();
    
    socket.on("userInformationUpdated", () => {
      this.getDataFromUserPets(true);
    });
  }
  
  render() {
    const { pets, loading, loadingError, petForPetInterfaceModal, showPetInterfaceModal } = this.state;
    const { updateInformationAboutUser } = this.props;
    
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
        
        { showPetInterfaceModal && <PetInterfaceModal 
                                     pet={ petForPetInterfaceModal } 
                                     toggleShowPetInterfaceModal={ this.toggleShowPetInterfaceModal } 
                                     deletePetFromPets={ this.deletePetFromPets } 
                                     updateInformationAboutUser={ updateInformationAboutUser }/> }
      </div>
    );
  }
}

module.exports = Pets;