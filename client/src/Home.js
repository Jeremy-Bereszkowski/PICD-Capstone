import React, { Component } from 'react';
import App from './App';
import UnAuthApp from './unauthenticated-app';

class Home extends Component {
  
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  }

  render() {
    // calls the isAuthenticated method in authentication service
    //const { isAuthenticated } = this.props.auth;
    const isAuthenticated = true;

    return (
      <div>
        {
          //isAuthenticated() && <App logoutHandler={this.logout}/> 
          isAuthenticated && <App logoutHandler={this.logout}/>
        }
        {
          //!isAuthenticated() && <UnAuthApp auth={this.props.auth}/>
          !isAuthenticated && <UnAuthApp auth={this.props.auth}/>
        }
      </div>
    );
  }
}

export default Home;