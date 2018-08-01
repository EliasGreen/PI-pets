const React = require("react");
const styles = require("../../../styles/pets/cat");

const Cat = require("../../../pets/cat");

class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: false,
      pets: []
    }
    this.getDataFromUserPets = this.getDataFromUserPets.bind(this);
    this.compilePetsIntoComponents = this.compilePetsIntoComponents.bind(this);
  }
  
  compilePetsIntoComponents(pets) {
       
    const petComponents = {
      "Cat": Cat,
      "Dog": "DOG-TODO"
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
    const { pets } = this.state;
    
    const petsInComponents = this.compilePetsIntoComponents(pets);
    
    return(
      <div className="Playground__frame__pets">
        { petsInComponents }
      </div>
    );
  }
}

module.exports = Pets;