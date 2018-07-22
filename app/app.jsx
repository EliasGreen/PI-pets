const React = require("react");
const { render } = require("react-dom");
const Route = require("react-router-dom").Route;
const BrowserRouter = require("react-router-dom").BrowserRouter;
const hashHistory = require("react-router-dom").hashHistory;
const main_styles = require("./styles/Main");

/* Import Components */
const IndexPage = require("./components/IndexPage");
const Playground = require("./components/Playground");

render((
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IndexPage}/>
      <Route exact path="/playground" component={Playground}/>
    </div>
  </BrowserRouter>), 
  document.getElementById("main")
);