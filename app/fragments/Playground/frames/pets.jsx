const React = require("react");
const styles = require("../../../styles/pets/cat");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

const Cat = require("../../../pets/cat");
const Dog = require("../../../pets/dog");

class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null,
      pets: []
    }
    this.getDataFromUserPets = this.getDataFromUserPets.bind(this);
    this.compilePetsIntoComponents = this.compilePetsIntoComponents.bind(this);
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
      return <PetComponent petColors={pet.petColors} opacity={opacity} key={pet._id}/>
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
    const { pets, loading, loadingError } = this.state;
    
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
      </div>
    );
  }
}

module.exports = Pets;