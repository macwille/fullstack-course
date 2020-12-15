import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom"

import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Navbar from './components/Navbar'
import About from './components/About'

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])

  // User hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  // Users hook
  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
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
      <div>
        <Navbar user={user} setUser={setUser} />
        <Notification />
        <Switch>
          <Route path="/blogs">
            <BlogList blogs={blogs} setBlogs={setBlogs} />
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} single={true} />
          </Route>
          <Route path="/create">
            {user === null ? <LoginForm user={user} setUser={setUser} />
              :
              <BlogForm blogs={blogs} setBlogs={setBlogs} />}
          </Route>
          <Route path="/users/:id">
            <User blogs={blogs} />
          </Route>
          <Route path="/users">
            <UserList users={users} />
          </Route>
          <Route path="/login">
            <LoginForm user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <About user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App