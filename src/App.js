import React from 'react';
import * as Router from 'react-router-dom';
import './App.css';

import Home from './Pages/Home.js';

function App() {
  return (
    <React.StrictMode>
      <Router.BrowserRouter>
        <Router.Switch>
          <Router.Route exact path="/">
            <Home />
          </Router.Route>
        </Router.Switch>
      </Router.BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
