import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Button } from 'react-bootstrap'

import PropTypes from 'prop-types'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { setReduxUser } from '../reducers/userReducer'

const LoginForm = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(loginUser)
      )
      dispatch(setMessage(`Logged in as user "${loginUser.username}".`))
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      dispatch(setReduxUser(loginUser))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setMessage('Login failed.'))
      console.log(e)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Blogs - Login</title>
      </Helmet>
      <h2>Login</h2>
      {user === null ?
        <Togglable buttonLabel='Login'>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
              <Form.Label>Password:</Form.Label>
              <Form.Control id='password' type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </Form.Group>
            <Button id="login-button" type="submit">Login</Button>
          </Form>
          <br />
        </Togglable>
        :
        <p>You are Logged in as {user.username}.</p>
      }
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm