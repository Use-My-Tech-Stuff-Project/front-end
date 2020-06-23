
import React, { useState } from 'react';
import './App.css';
import SignUp from './components/SignUp'
import { Switch, Route, Link } from 'react-router-dom'

import Login from './components/login/Login';

import RentalPage from "./components/RentalPage";
import Item from "./components/Item";

function App() {
  const [user, setUser] = useState({ username: "simon", user_id: "0" });
  const [items, setItems] = useState([
    {
      name: "camera",
      user_id: "0",
      category: "camera",
      picture: "",
      cost: "$10",
      availability: "true",
      description: "yes sir",
      item_id: "0",
    },
    {
      name: "camera2",
      user_id: "1",
      category: "camera",
      picture: "",
      cost: "$10",
      availability: "true",
      description: "yes sir",
      item_id: "1",
    }
  ]);

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
      <Route path="/rentalpage">
          <RentalPage user={user} items={items} />
        </Route>
        <Route path={`/item/:id`}>
          <Item items={items} />
        </Route>
      </Route>
      </Switch>

    </div>
  );
}

export default App;
