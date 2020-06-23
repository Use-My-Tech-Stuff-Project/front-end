import React from 'react';
import './App.css';
import SignUp from './components/SignUp'
import {Switch, Route, Link} from 'react-router-dom'

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
      <Route>

      </Route>
      </Switch>  
    </div>
  );
}

export default App;
