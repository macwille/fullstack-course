import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom"
import { Container } from 'react-bootstrap'

import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Navbar from './components/Navbar'
import About from './components/About'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setReduxblogs } from './reducers/blogReducer'
import SingleBlog from './components/SingleBlog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [users, setUsers] = useState([])

  // Logged user hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  // Blogs hook
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        dispatch(setReduxblogs(initialBlogs))
      })
  }, [dispatch])

  // Users hook
  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
  }, [])

  return (
    <Router>
      <Container>
        <Navbar />
        <br></br>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <SingleBlog />
          </Route>
          <Route path="/blogs">
            <BlogList />
          </Route>
          <Route path="/create">
            {user === null ? <LoginForm />
              :
              <BlogForm />}
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserList users={users} />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App