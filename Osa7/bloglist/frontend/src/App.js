import React, { useState, useEffect } from 'react'
import {
  Switch, Route
} from "react-router-dom"

import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Navbar from './components/Navbar'

const App = () => {

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
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

  // Users hook
  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        console.log(initialUsers)
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
    <div>
      <Navbar user={user} setUser={setUser} setErrorMessage={setErrorMessage}></Navbar>
      <Notification message={errorMessage} />
      <Switch>
        <Route path="/blogs">
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </Route>
        <Route path="/create">
          {user === null ? <LoginForm user={user} setErrorMessage={setErrorMessage} setUser={setUser}></LoginForm>
            :
            <BlogForm blogs={blogs} setBlogs={setBlogs} />}
        </Route>
        <Route path="/users/:id">
          <User users={users}></User>
        </Route>
        <Route path="/users">
          <UserList users={users}></UserList>
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
    </div>
  )
}

export default App