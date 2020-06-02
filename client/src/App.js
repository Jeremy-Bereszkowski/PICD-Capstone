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
import ProjectEdit from './views/project/ProjectEdit'
import ProjectDelete from './views/project/ProjectDelete'

import StageDesign from './views/project/stages/StageDesign'
import StageSimulation from './views/project/stages/StageSimulation'
import StageLayout from './views/project/stages/StageLayout'
import StageTest from './views/project/stages/StageTest'

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
						<ProtectedRoute path="/project/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <Project {...props}/>} footer={() => <Footer />}/>

        				<ProtectedRoute path="/newProject/" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <ProjectNew {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectEdit/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <ProjectEdit {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectDelete/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <ProjectDelete {...props}/>} footer={() => <Footer />}/>

        				<ProtectedRoute path="/newProject/" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <NewProject {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectEdit/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <EditProject {...props}/>} footer={() => <Footer />}/>
        				<ProtectedRoute path="/projectDelete/:id" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <DeleteProject {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/project/:id/design" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <StageDesign {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/project/:id/simulation" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <StageSimulation {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/project/:id/layout" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <StageLayout {...props}/>} footer={() => <Footer />}/>
                        <ProtectedRoute path="/project/:id/test" header={(props) => <Header items={AuthHeaderItems} {...props}/>} component={(props) => <StageTest {...props}/>} footer={() => <Footer />}/>
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