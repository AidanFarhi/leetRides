import React from 'react';
import './cmp-styles/App.css';
import Routes from './Routes'
import {Navbar} from './components'
import {Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/'>
        <Redirect to='/home'/>
      </Route>
      <Routes />
    </div>
  );
}

export default App;
