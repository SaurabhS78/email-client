//react

import React , {useEffect} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import  PrivateRoute  from "./Authorisation/PrivateRoutes";

//components
import SideBar from "./Components/SideBar";
//containers
import Compose from "./Containers/Compose";
import Home from "./Containers/Home";
import SentContainer from "./Containers/SentContainer";
//css

import "./App.css";
import AuthSignIn from "./Authorisation/AuthSignIn";
import Register from "./Authorisation/Register";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("user-auth");
    console.log(token);
  }, []);
  return (
    <>
      <Router>
      {/* <SideBar /> */}
        <Switch>
          <Route path="/signin" component={AuthSignIn} />
          <Route path="/register" component={Register} />
          <Route path="/compose" component={Compose} />
          <Route path="/sent" component={SentContainer} />
          <PrivateRoute exact path="/home" component={Home} />
          <Redirect from="*" to="/signin" />

        </Switch>
      </Router>
    </>
  );
}

export default App;
