const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

class WorldMarket extends React.Component {
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
        <div className="Playground__frame__worldMarket">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__worldMarket">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    return(
      <div className="Playground__frame__worldMarket">
        WorldMarket
      </div>
    );
  }
}

module.exports = WorldMarket;