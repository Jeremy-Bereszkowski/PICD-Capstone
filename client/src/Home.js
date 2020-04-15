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
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() &&
          <div className="container column">
            <h5>
              You are logged in!{' '}
              <a style={{ cursor: 'pointer' }} onClick={this.logout}>
                Log Out
              </a>
            </h5>
            <App />
          </div>
        }
        {
          !isAuthenticated() && <UnAuthApp auth={this.props.auth}/>
        }
      </div>
      );
    }
}

export default Home;