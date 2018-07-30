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
    
    console.log("Pets");
    console.log(pets);
    
    return(
      <div className="Playground__frame__pets">
        {  }
      </div>
    );
  }
}

module.exports = Pets;