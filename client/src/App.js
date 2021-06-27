//react

import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./Authorisation/PrivateRoutes";

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
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("user-auth");
    if (token) setLoggedIn(true);
  }, []);
  return (
    <>
      <Router>
        {loggedIn && <SideBar />}
        <Switch>
          <Route path="/signin" component={AuthSignIn} />
          <Route path="/register" component={Register} />
          <Route path="/compose" component={Compose} />
          <Route path="/scheduled" component={SentContainer} />
          <Route exact path="/home" component={Home} />
          <Redirect from="*" to="/signin" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
