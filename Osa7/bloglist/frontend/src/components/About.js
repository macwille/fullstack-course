import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'

const About = ({ user }) => {
  const dispatch = useDispatch()

  const testButton = (event) => {
    event.preventDefault()
    dispatch(setMessage('Test'))

  }
  return (
    <div>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <h2>Welcome to Blogs</h2>
      {user ? <p>You are logged in as <b>{user.username}</b></p> :
        <p>Log in to create blogs</p>}
      <button onClick={testButton}>Redux test</button>
    </div>
  )
}

export default About