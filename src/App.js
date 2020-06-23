import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

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
    <Router>
      <div className="App">
        <Route path="/rentalpage">
          <RentalPage user={user} items={items} />
        </Route>
        <Route path={`/item/:id`}>
          <Item items={items} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
