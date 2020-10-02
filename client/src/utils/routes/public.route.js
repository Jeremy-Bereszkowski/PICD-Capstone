import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PublicRoute = ({ component, ...args }) => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <Redirect push to="/dashboard" />;
    } else {
        return <Route
            component={component}
            {...args}
        />;
    }
};

export default PublicRoute;
