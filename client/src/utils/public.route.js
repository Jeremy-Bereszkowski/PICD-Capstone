import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

/**
 * Public Route only allows unauthorized users to access the route. If a user is
 * logged in they will be redirected to the authorized landing page (/dashboard).
 * 
 * @param {*} param0 
 */

const PublicRoute = ({
  header: Header,
  component: Component,
  footer: Footer,
  ...rest
}) => {
  return (
    <>
      <Header/>
      <main>
        <Route
          {...rest}
          render={props => {
            if (!auth.isAuthenticated()) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect to={{
                    pathname: "/dashboard",
                    state: {
                      from: props.location
                    }
                  }}
                />
              );
            }
          }}
        />
      </main>
      <Footer/>
    </>
  );
};

export default PublicRoute