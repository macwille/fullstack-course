import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { Button, Container } from 'react-bootstrap'

const About = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const testNotification = (event) => {
    event.preventDefault()
    dispatch(setMessage('Notification Test'))
  }

  console.log('Redux blogs:', blogs)

  return (
    <div>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <h2>Welcome to Blogs</h2>
      {user ? <p>You are logged in as <b>{user.username}</b></p> :
        <p>Log in to create blogs</p>}
      <Container>
        <Button onClick={testNotification}>Notification test</Button>
      </Container>
    </div>
  )
}

export default About