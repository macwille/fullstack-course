import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
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
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      console.log('Current user:', loggedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(loginUser)
      )
      setErrorMessage('Logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      blogService.setToken(loginUser.token)
      setUser(loginUser)
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
    setUser(null)
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
        setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      })
  }

  const handleDelete = (blog) => {
    if (window.confirm('IS U SURE?')) {
      blogService
        .deleteBlog(blog)
        .then(returnedBlog => {
          console.log('deleted blog', returnedBlog)
          setBlogs(blogs.filter(b => b.id !== returnedBlog.id))
        })
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <LoginForm
        setErrorMessage={setErrorMessage}
        setUser={setUser}
        user={user}
        handleLogout={handleLogout}
      />
      <BlogList blogs={blogs} addLike={addLike} handleDelete={handleDelete} />
      <BlogForm createBlog={addBlog} />
    </div >
  )
}

export default App