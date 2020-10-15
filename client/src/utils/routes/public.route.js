import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {NewUser} from "../api";

const PublicRoute = ({ component, ...args }) => {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    if (isAuthenticated) {
        NewUser(user.name, getAccessTokenSilently)
        .then(() => {
        })
            return <Redirect push to="/dashboard" />
    } else {
        return <Route
            component={component}
            {...args}
        />;
    }
};

export default PublicRoute;
