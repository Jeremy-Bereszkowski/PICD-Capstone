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
import Logo from './img/icon.png'
import {Input} from './components/lib'
import {useAsync} from './utils/use-async'
import './unAuthApp.css'

function LoginForm({onSubmit, submitButton}) {

  const {isLoading, isError, error, run} = useAsync()
  
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

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
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
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
  <div css={{display: 'flex', justifyContent: 'flex-end'}}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

function UnauthenticatedApp({login, register}) {
  return (
    <div class='centre-cell'>
      <img src={Logo} class='img_logo'/>
      <h1>PICD - Capstone 2020</h1>
      <div>
        <Modal
          aria-label="Login form"
          button={<Button variant="primary">Login</Button>}
        >
          {circleDismissButton}
          <h3 class='centre_heading'>Login</h3>
          <LoginForm
            onSubmit={login}
            submitButton={<Button variant="primary">Login</Button>}
          />
        </Modal>
      </div>
    </div>
  )
}

export {UnauthenticatedApp}
