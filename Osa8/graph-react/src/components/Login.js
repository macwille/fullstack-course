import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ setToken, handleLogout }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    
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
        <button onClick={(e) => handleLogout(e)}>Logout</button>}
    </div>
  )
}

export default Login