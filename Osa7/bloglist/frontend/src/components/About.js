import React from 'react'
import { Helmet } from 'react-helmet'

const About = ({ user }) => {
  return (
    <div>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <h2>Welcome to Blogs</h2>
      {user ? <p>You are logged in as <b>{user.username}</b></p> :
        <p>Log in to create blogs</p>}
    </div>
  )
}

export default About