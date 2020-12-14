import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

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
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setErrorMessage('Logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('You shall not pass')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.clear()

    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }
  const addLike = (blog) => {
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        console.log('updated blog', returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      })
  }
  const handleDelete = (blog) => {
    if (window.confirm('IS U SURE?')) {
      blogService
        .deleteBlog(blog)
        .then(returnedBlog => {
          console.log('deleted blog', returnedBlog)
          setBlogs(blogs.filter(blog => blog.id !== returnedBlog.id))
        })
    }
  }

  const userInfo = () => {
    return (
      <div>
        <h4>Logged in as {user.name} <button onClick={handleLogout}> log out</button></h4>
      </div>
    )
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>

      {user !== null && userInfo()}

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          {blogForm()}
        </div>
      }

      <BlogList blogs={blogs} addLike={addLike} handleDelete={handleDelete} />

    </div >
  )
}

export default App