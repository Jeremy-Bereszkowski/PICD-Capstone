import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="dev-m8u82c98.au.auth0.com"
            clientId="OwAAbLLWCADe3icz6YhUYvxfqrY0Gdj5"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience='https://api.picdcapstone2020.dev'
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
