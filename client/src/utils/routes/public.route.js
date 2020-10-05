import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import callAPI from "../callAPI";

const PublicRoute = ({ component, ...args }) => {
    const { isAuthenticated, user } = useAuth0();

    if (isAuthenticated) {
        callAPI.newUser((() => {

            }),
            user.name,
            (() => {

            }))

        return <Redirect push to="/dashboard" />
    } else {
        return <Route
            component={component}
            {...args}
        />;
    }
};

export default PublicRoute;
