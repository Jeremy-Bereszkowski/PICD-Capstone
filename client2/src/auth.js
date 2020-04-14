import history from './history';

export default class Auth {
  
  login = () => {
    debugger;
    fetch('http://localhost:9000/sql/login', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        uname: 's3539822@student.rmit.edu.au',//username.value,
        pword: 'hello'//password.value
      })
    })
      .then((response) => {
        debugger;
        this.handleAuthentication(response);
      })
  }

  handleAuthentication = (response) => {
    debugger;
    if (response.status !== 200) {
      history.replace('/home');
      console.log(response.status);
      console.log(response.body);
    }
    else {
      console.log(response.body);
      this.setSession(response.body);
      history.replace('/home');
    }
  }

  setSession = (body) => {
    debugger;
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