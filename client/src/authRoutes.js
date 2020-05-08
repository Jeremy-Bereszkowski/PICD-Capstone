import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';

const authRoutes = () => (
    <div>
      <Route path="/" render={(props) => <Dashboard {...props} />} />
    </div>
);

export default authRoutes;