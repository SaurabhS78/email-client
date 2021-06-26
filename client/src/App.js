//react
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//components
import SideBar from './Components/SideBar';
//containers
import Compose from './Containers/Compose';
import Home from './Containers/Home';
import SentContainer from './Containers/SentContainer';
//css
import './App.css';

function App() {
  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/scheduled' component={Home}/>
          <Route path='/compose' component={Compose}/>
          <Route path='/sent' component={SentContainer}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
