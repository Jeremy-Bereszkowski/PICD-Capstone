import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import ProjectDetails from './views/ProjectDetails';
import ProjectDashboard from './views/ProjectDashboard';

const authRoutes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={(props) => <Dashboard {...props} />} />
        <Route path="/projectDetails/:id" component={(props) => <ProjectDetails {...props}/>} />
        <Route path="/projectDashboard/:id" component={(props) => <ProjectDashboard {...props}/>} />
      </Switch>
    </Router>
);

export default authRoutes;