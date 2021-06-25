//react
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//components
import SideBar from './Components/SideBar';
//containers
import Inbox from './Containers/Inbox';
import Compose from './Containers/Compose';
//css
import './App.css';

function App() {
  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/inbox' component={Inbox}/>
          <Route path='/compose' component={Compose}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
