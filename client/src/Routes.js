import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';
import Auth from './auth';
import history from './history';

const auth = new Auth();

const Routes = () => (
  <Router history={history} component={Home}>
    <div>
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
    </div>
  </Router>
);

export default Routes;