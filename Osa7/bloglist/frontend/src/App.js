import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  // User hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      console.log(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  // Blogs hook
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} setErrorMessage={setErrorMessage}></Navbar>
      <Notification message={errorMessage} />
      <Switch>
        <Route path="/blogs">
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </Route>
        <Route path="/create">
          {user === null ?
            <LoginForm user={user}
              setErrorMessage={setErrorMessage}
              setUser={setUser}></LoginForm>
            :
            <BlogForm blogs={blogs} setBlogs={setBlogs} />
          }
        </Route>
        <Route path="/users">
          <h2>Users</h2>
        </Route>
        <Route path="/login">
          <LoginForm user={user}
            setErrorMessage={setErrorMessage}
            setUser={setUser}></LoginForm>
        </Route>
        <Route path="/">
          <h2>Welcome to Blogs</h2>
        </Route>
      </Switch>
    </Router >
  )
}

export default App