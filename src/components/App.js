import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import LandingPage from "./Landing";

function App() {
  return (
      <Router>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
      </Router>
  );
}

export default App;
