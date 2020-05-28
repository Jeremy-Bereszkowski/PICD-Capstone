import React, { Component } from 'react'
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import ProtectedRoute from './utils/protected.route'
import PublicRoute from './utils/public.route'
import auth from './utils/auth'

import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './views/Dashboard'
import Project from './views/Project'
import NewProject from './views/NewProjectForm'
import EditProject from './views/EditProject'
import DeleteProject from './views/DeleteProject'
import Login from './views/Login'

import Admin from './views/admin/Admin'
import AdminNewUser from './views/admin/AdminNewUser'
import AdminEditUser from './views/admin/AdminEditUser'

import './css/App.css'

class App extends Component{
    render() {
        const AuthHeaderItems = {
            buttons: [
                {title: auth.getClearance() === 'admin' ? 'Admin' : '', type: "Link", link: "/admin"},
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
						<ProtectedRoute path="/project/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Project {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/newProject/" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <NewProject {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectEdit/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <EditProject {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectDelete/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <DeleteProject {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/admin" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Admin {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path='/admin/users/new' header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <AdminNewUser {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path='/admin/users/:id' header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <AdminEditUser {...props}/>} footer={() => <Footer />}/>
                    </Switch>
                </Router>
            </div>
        );
    }
    
}

export default App; 