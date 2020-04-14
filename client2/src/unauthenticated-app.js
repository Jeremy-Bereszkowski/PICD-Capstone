import React, { Component } from 'react'
import Logo from './imgs/photon_icon.png'
import './css/unAuthApp.css'

class UnauthenticatedApp extends Component {

  login = () => {
    debugger;
    this.props.auth.login();
  }
  
  render() {
    return (
      <div class='content_pane'>
        <img class="logo-image" src={Logo} alt="paybuddy-logo"/>
        <h1>PICD - Capstone 2020</h1>
        <button onClick={this.login}>Login</button>
      </div>
    )
  }
}

export default UnauthenticatedApp
