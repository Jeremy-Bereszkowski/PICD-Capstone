import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import Project from './views/Project';

const authRoutes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={(props) => <Dashboard {...props} />} />
        <Route path="/project/:id" component={(props) => <Project {...props}/>} />
      </Switch>
    </Router>
);

export default authRoutes;