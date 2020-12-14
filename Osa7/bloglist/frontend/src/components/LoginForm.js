import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({
  user,
  setErrorMessage,
  setUser
}) => {

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
      setErrorMessage('Logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('You shall not pass')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear()
    setUser(null)
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      { user !== null ?
        <div>
          <p>Logged in as {user.name}</p> <button onClick={handleLogout}> Log out</button>
        </div>
        :
        <Togglable buttonLabel='Login'>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username:
          <input id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              Password:
          <input id='password' type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id="login-button" type="submit">
              Login
        </button>
          </form>
        </Togglable>}
    </div>
  )
}

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoginForm