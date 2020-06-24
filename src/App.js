
import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp'
import { Switch, Route, Link } from 'react-router-dom'

import Login from './components/login/Login';

import RentalPage from "./components/RentalPage";
import Item from "./components/Item";
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from "./components/PrivateRoute"
import OwnerPage from "./components/OwnerPage";
import UpdateItem from "./components/UpdateItem";
import AddItem from "./components/AddItem";
import ReturnItem from "./components/ReturnItem";

function App() {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);

  function getItems() {
      axiosWithAuth()
        .get("/api/items")
        .then(res => setItems(res.data))
  }
  

  useEffect(() => getItems(), [])

  return (

    <div className="App">

      <nav>
        <h1> Use My Tech Stuff</h1>
        <div className='nav-links'>
          <Link to='/'> Home </Link>
          <Link to='/login'> Login </Link>
          <Link to='/signup'>Signup</Link>
          {/* <Link to='/ownerpage'>Owner Page</Link>
          <Link to='/rentalpage'>Rental Page</Link> */}
        </div>
      </nav>
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login setUser={setUser} />
        </Route>
      </Switch>

      <PrivateRoute path="/rentalpage">
        <RentalPage user={user} items={items} />
      </PrivateRoute>
      <PrivateRoute path={`/item/:id`}>
        <Item items={items} user={user} getItems={getItems} />
      </PrivateRoute>
      <PrivateRoute path="/ownerpage">
        <OwnerPage user={user} items={items} />
      </PrivateRoute>
      <PrivateRoute path={`/updateItem/:id`}>
        <UpdateItem items={items} user={user} getItems={getItems}/>
      </PrivateRoute>
      <PrivateRoute path={`/additem`}>
        <AddItem user={user} items={items} getItems={getItems}/>
      </PrivateRoute>
      <PrivateRoute path={`/rentedItem/:id`}>
        <ReturnItem items={items} user={user} getItems={getItems}/>
      </PrivateRoute>
    </div>
  );
}

export default App;
