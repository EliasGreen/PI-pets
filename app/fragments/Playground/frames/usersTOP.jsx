const React = require("react");
const styles = require("../../../styles/Playground");

const LoadingCircleSpinner = require("../../../utils/loadingCircleSpinner");

class UsersTOP extends React.Component {
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
        <div className="Playground__frame__usersTOP">
          <div className="loadingErrorBox">
            { "Error: loading has failed - please, try again." }
          </div>
        </div>
      );  
    }
    
    if (loading) {
      return(
        <div className="Playground__frame__usersTOP">
          <LoadingCircleSpinner />
        </div>
      );  
    }
    return(
      <div className="Playground__frame__usersTOP">
        UsersTOP
      </div>
    );
  }
}

module.exports = UsersTOP;