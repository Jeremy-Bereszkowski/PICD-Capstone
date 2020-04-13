/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import {
  CircleButton,
  Button,
  Spinner,
  FormGroup,
  ErrorMessage,
} from './components/lib'
import {Modal, ModalDismissButton} from './components/modal'
import Logo from './imgs/photon_icon.png'
import {Input} from './components/lib'
import {useAuth} from './context/auth-context'
import {useAsync} from './utils/use-async'
import './css/unAuthApp.css'

function LoginForm({onSubmit, submitButton}) {

  const {isLoading, isError, error, run} = useAsync()
  
  function handleSubmit(event) {

    event.preventDefault()
    const {username, password} = event.target.elements

    debugger;

    /* run(
      fetch('http://localhost:9000/sql/login', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          uname: username.value,
          pword: password.value
        })
      }).then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
          console.log(response.body);
        }
        else {
          console.log(response.body);
        }
      })
    ) */
    
    
    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit} class='form_css'>
      <FormGroup>
        <label htmlFor="username">E-Mail</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div class='loginButton'>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

const circleDismissButton = (
  <div class='circleDismiss'>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

function UnauthenticatedApp() {
  const {login} = useAuth()

  return (
    <div class='content_pane'>
      <img class="logo-image" src={Logo} alt="paybuddy-logo"/>
      <h1>PICD - Capstone 2020</h1>
      <div>
        <Modal
          aria-label="Login form"
          button={<Button variant="primary">Login</Button>}
        >
          {circleDismissButton}
          <h3 class='heading'>Login</h3>
          <LoginForm
            onSubmit={login}
            submitButton={<Button variant="primary">Login</Button>}
          />
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
