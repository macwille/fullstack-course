import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

export const handleLogout = setToken => {
  setToken(null)
  localStorage.clear()
}

const Login = ({ setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data, setToken])

  const handleLogin = (event) => {
    console.log('Login')
    event.preventDefault()
    login({ variables: { username, password } }).then((response) => {
      const token = response.data.login.value
      setToken(token)
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {!localStorage.getItem('token') ?
        <div>
          <b>Login</b>
          <form onSubmit={handleLogin}>
            <p>Username:
        <input value={username} onChange={({ target }) => setUsername(target.value)} required /></p>
            <p>Password:
        <input value={password} onChange={({ target }) => setPassword(target.value)} required /></p>
            <button type="submit">Login</button>
          </form>
        </div>
        :
        <button onClick={() => handleLogout(setToken)}>Logout</button>}
    </div>
  )
}

export default Login