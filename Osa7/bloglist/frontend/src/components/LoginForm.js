import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Button } from 'react-bootstrap'

import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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
      dispatch(setUser(loginUser))
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
      {!user ?
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

export default LoginForm