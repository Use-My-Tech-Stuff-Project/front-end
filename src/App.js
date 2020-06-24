import React from 'react';
import './App.css';
import SignUp from './components/SignUp'
import {Switch, Route, Link} from 'react-router-dom'

import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
    
      <nav>
        <h1 className='text'> Use My Tech Stuff</h1>
        <div className='nav-links'>
        <Link to='/' className='text link'> Home </Link>
        <Link to='/login' className='text link'> Login </Link>
        <Link to='/signup' className='text link'>Signup</Link>
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
