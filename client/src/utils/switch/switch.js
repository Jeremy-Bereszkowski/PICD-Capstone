import React from "react";
import {Switch} from 'react-router-dom';
import {PrivateRoute, PublicRoute} from "../routes";
import {Dashboard, Login} from "../../views";
import {Project, ProjectNew, ProjectSettings, Stage} from "../../views/project";
import {Settings} from "../../views/user";
import {AdminUser, AdminUserEdit, AdminUserNew} from "../../views/admin";

const MainSwitch = () => {
    return (
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
    );
}

export default MainSwitch;
