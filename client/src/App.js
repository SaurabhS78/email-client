//react
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "./Authorisation/PrivateRoutes";
//components
import SideBar from "./Components/SideBar";
//containers
import Compose from "./Containers/Compose";
import Home from "./Containers/Home";
import SentContainer from "./Containers/SentContainer";
//css
import "./App.css";
import AuthSignIn from "./Authorisation/AuthSignIn";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from "./Authorisation/Register";

function App() {
  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path="/scheduled" component={Home} />
          <Route path="/compose" component={Compose} />
          <Route path="/sent" component={SentContainer} />
          <Route path="/signin" component={AuthSignIn} />
          <Route path="/register" component={Register} />
          <Redirect from="*" to="/signin" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
