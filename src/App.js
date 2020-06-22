import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/login'>
          <Login />
        </Route>
        <Route path = '/'>

        </Route>
      </Switch>
    </div>
  );
}

export default App;
