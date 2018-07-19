const React = require("react");
const { render } = require("react-dom");
const Route = require("react-router-dom").Route;
const BrowserRouter = require("react-router-dom").BrowserRouter;
const hashHistory = require("react-router-dom").hashHistory;
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const reducers = require("./reducers");
const main_styles = require("./styles/Main");

let store = createStore(reducers);

/* Import Components */
const IndexPage = require("./components/IndexPage");
const Playground = require("./components/Playground");

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/playground" component={Playground}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById("main"));