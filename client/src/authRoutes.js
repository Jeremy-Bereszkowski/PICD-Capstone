import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import Project from './views/Project';
import NewProject from './views/NewProjectForm';
import EditProjectDetails from './views/EditProjectDetails';

const authRoutes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={(props) => <Dashboard {...props} />} />
        <Route path="/project/:id" component={(props) => <Project {...props}/>} />
        <Route path="/newProject/" component={(props) => <NewProject {...props}/>} />
        <Route path="/projectEdit/:id" component={(props) => <EditProjectDetails {...props}/>} />
      </Switch>
    </Router>
);

export default authRoutes;