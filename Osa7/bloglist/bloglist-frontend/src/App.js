import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} />
      <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} user={user} />
      <BlogList blogs={blogs} setBlogs={setBlogs} />
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
    </div >
  )
}

export default App