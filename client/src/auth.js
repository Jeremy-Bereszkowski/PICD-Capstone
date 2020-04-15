import history from './history';

export default class Auth {

  handleAuthentication = (response) => {
    if (response.status === 200) {
      this.setSession(response.body);
      history.replace('/home');
    }
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((64000) + new Date().getTime());
    localStorage.setItem('access_token', body.clearance);
    localStorage.setItem('id_token', body.user_id);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }  

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}