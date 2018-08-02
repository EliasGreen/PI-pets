const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

class IngameShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: null
    }
  }
  
  render() {
    const { loading, loadingError } = this.state;
    
    if (loadingError) {
      return(
        <div className="Playground__frame__ingameShop">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__ingameShop">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    
    return(
      <div className="Playground__frame__ingameShop">
        IngameShop
      </div>
    );
  }
}

module.exports = IngameShop;