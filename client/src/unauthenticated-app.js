import React, { useState } from 'react'
import Logo from './imgs/photon_icon.png'
import './css/unAuthApp.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function UnauthenticatedApp(props) {

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const handleShow = () => setShow(true);

  function closeForm() {
    setShow(false);
    setErr(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {username, password} = event.target.elements;

    fetch('http://localhost:9000/auth/login', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        uname: username.value,
        pword: password.value
      })
    })
    .then((response) => {

      if (response.status === 200) {
        props.auth.handleAuthentication(response);
      } else {
        setErr(true);
      }
    })
  }
  
  return (
    <div className='content_pane'>
      <img className="logo-image" src={Logo} alt="paybuddy-logo"/>
      <h1>PICD - Capstone 2020</h1>
      <div>
        <Button variant="primary" onClick={handleShow}>Login</Button>

        <Modal show={show} onHide={closeForm}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className='form_css'>
              <div className='form-item'>
                <label htmlFor='username'>E-Mail</label>
                <input className='input' id='username' type='text'/>
              </div>
              <div className='form-item'>
                <label htmlFor='password'>Password</label>
                <input className='input' id='password' type='password'/>
              </div>
              <div className='loginButton'>
                <Button type='submit' variant='primary'>Login</Button>
              </div>
              {err ? 'Incorrect E-Mail or Password' : null}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
