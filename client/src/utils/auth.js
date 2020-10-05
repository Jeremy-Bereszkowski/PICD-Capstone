import callAPI from './callAPI'
import {useAuth0} from "@auth0/auth0-react";

class Auth {

  constructor() {
    this.authenticated = false;
  }

  /*handleResponse = res => {
    //console.log(res)
    if (res.status === 200) {
      return res.json()
    }
    throw new Error(res.message);
  }

  login = (cb, email, password, error) => {
    //console.log(email + " " + password)

    callAPI.login(cb, email, password, error, ((res) => this.setSession(res)))
  }*/

  /*setSession = (body) => {
    // Set the time that the access token will expire at
    //let expiresAt = JSON.stringify((64000) + new Date().getTime());
    // console.log(body)

    sessionStorage.setItem('user', JSON.stringify({
      id: body.user.id,
      fname: body.user.fname,
      lname: body.user.lname,
      email: body.user.email,
      clearance: body.user.clearance,
    }));
    sessionStorage.setItem('authenticated', true);
    //this.authenticated = true;
  }

  // removes user details from localStorage
  logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authenticated');
    //this.authenticated = false;
  }*/

  // checks if the user is authenticated
  /*isAuthenticated = () => {
    return sessionStorage.getItem('authenticated');
  }*/

  getClearance = (user) => {
    for (var key in user) {
      if (typeof user[key] === 'object') {
        for (var key1 in user[key]) {
          return user[key][key1].toLowerCase()
        }
      }
    }
  }

  getUID = (user) => {
    return user.name;
  }
}

export default new Auth();
