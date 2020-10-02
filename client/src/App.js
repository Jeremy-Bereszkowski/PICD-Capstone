import React from 'react';
import { Switch} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { PublicRoute, PrivateRoute } from "./utils/routes/index";
import { Loading, Header, Footer } from "./components/index";
import { Login, Dashboard } from './views/index';
import { Project, ProjectNew, ProjectSettings, Stage } from './views/project/index';
import { AdminUser, AdminUserNew, AdminUserEdit } from './views/admin/index';
import { Settings } from './views/user/index';

import './css/App.css';

const App = () => {
    const { isLoading } = useAuth0();

    /**
     * Route - Used if all users need access to the page including unauthorized users
     *
     * PublicRoute - Used if only unauthorized user are to have access to the route (Used for login and sign up pages)
     *
     * ProtectedRoute - Used only if authorized user are to have access to the route
     */
    return (
        <div className="App">
            <Header/>
            {
                isLoading ? <Loading/> :
                    <Switch>
                        <PublicRoute exact path="/"
                                     component={(props) => <Login {...props}/>}/>
                        <PrivateRoute path="/dashboard"
                                      component={(props) => <Dashboard {...props}/>}/>
                        <PrivateRoute path="/project/new"
                                      component={(props) => <ProjectNew {...props}/>}/>
                        <PrivateRoute exact path="/project/:projectId"
                                      component={(props) => <Project {...props}/>}/>
                        <PrivateRoute path="/project/:projectId/settings"
                                      component={(props) => <ProjectSettings {...props}/>}/>
                        <PrivateRoute exact path="/project/:projectId/stage/:stageId"
                                      component={(props) => <Stage {...props}/>}/>
                        <PrivateRoute path="/user/settings"
                                      component={(props) => <Settings {...props}/>}/>
                        <PrivateRoute exact path="/admin/users"
                                      component={(props) => <AdminUser {...props}/>}/>
                        <PrivateRoute path='/admin/users/new'
                                      component={(props) => <AdminUserNew {...props}/>}/>
                        <PrivateRoute path='/admin/users/:id'
                                      component={(props) => <AdminUserEdit {...props}/>}/>
                    </Switch>
            }
            <Footer/>
        </div>
    );
}

export default App; 
