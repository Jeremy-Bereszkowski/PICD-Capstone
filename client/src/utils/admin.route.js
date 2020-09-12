import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

/**
 * Protected Routes only allow authorized users to access the route. Any 
 * unauthorized users will be redirected to the landing page (login page)
 * 
 * 
 * @param {*} param0 
 */

const ProtectedRoute = ({
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
            if (auth.isAuthenticated() && auth.getClearance() === 'admin') {
              return <Component {...props} />;
            } else {
              return (
                <Redirect to={{
                    pathname: "/",
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

export default ProtectedRoute
