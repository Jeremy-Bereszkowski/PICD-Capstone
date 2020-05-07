import React from 'react';
import { Route, Router } from 'react-router-dom';
import Auth from './auth';
import Dashboard from './components/Dashboard.jsx';
import history from './history';

const authRoutes = () => (
    <div>
      <Route path="/" component={Dashboard}/>
    </div>
);

export default authRoutes;