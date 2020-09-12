import React, { Component } from 'react'
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import AdminRoute from './utils/admin.route'
import ProtectedRoute from './utils/protected.route'
import PublicRoute from './utils/public.route'
import auth from './utils/auth'

import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './views/Dashboard'
import Login from './views/Login'

import Project from './views/project/Project'
import ProjectNew from './views/project/ProjectNew'
import ProjectSettings from './views/project/ProjectSettings'

import Stage from './views/project/Stage'

import AdminUser from './views/admin/AdminUser'
import AdminUserNew from './views/admin/AdminUserNew'
import AdminUserEdit from './views/admin/AdminUserEdit'

import './css/App.css'

class App extends Component{
    render() {
        const AuthHeaderItems = {
            buttons: [
                {title: auth.getClearance() === 'admin' ? 'Admin' : '', type: "Link", link: "/admin/users"},
                {title: 'Dashboard', type: "Link", link: "/dashboard"},
                {title: 'Logout', type: "Logout", link: "/", onClick: () => {auth.logout()}},
            ],
            title: {
                name: process.env.REACT_APP_NAME,
                link: "/dashboard"
            }
        };
    
        const unAuthHeaderItems = {
            buttons: [],
            title: {
                name: process.env.REACT_APP_NAME,
                link: "/"
            }
        }
    
        /**
         * Route - Used if all users need access to the page including unauthorized users
         * 
         * PublicRoute - Used if only unauthorized user are to have access to the route (Used for login and sign up pages)
         * 
         * ProtectedRoute - Used only if authorized user are to have access to the route
         */
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <PublicRoute exact path="/" header={(props) => <Header items={unAuthHeaderItems} {...props}/>} component={(props) => <Login {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/dashboard" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Dashboard {...props}/>} footer={() => <Footer />}/>
						<ProtectedRoute path="/project/new" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <ProjectNew {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute exact path="/project/:projectId" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Project {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/project/:projectId/settings" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <ProjectSettings {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute exact path="/project/:projectId/stage/:stageId" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Stage {...props}/>} footer={() => <Footer />}/>
                        <AdminRoute exact path="/admin/users" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <AdminUser {...props}/>} footer={() => <Footer />}/>
                        <AdminRoute path='/admin/users/new' header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <AdminUserNew {...props}/>} footer={() => <Footer />}/>
                        <AdminRoute path='/admin/users/:id' header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <AdminUserEdit {...props}/>} footer={() => <Footer />}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App; 