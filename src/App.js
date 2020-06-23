import React from 'react';
import './App.css';
import SignUp from './components/SignUp'
import {Switch, Route, Link} from 'react-router-dom'

import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
    
      <nav>
        <h1> Use My Tech Stuff</h1>
        <div className='nav-links'>
        <Link to='/'> Home </Link>
        <Link to='/login'> Login </Link>
        <Link to='/signup'>Signup</Link>
        </div>
      </nav>  
      <Switch>
        <Route path='/signup'>
          <SignUp/>
        </Route>
        <Route path = '/login'>
          <Login />
        </Route>
      <Route>

      </Route>
      </Switch>
    
    </div>
  );
}

export default App;
