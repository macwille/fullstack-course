import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const BlogForm = ({ blogs, setBlogs }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setMessage(`Created blog "${newTitle}".`))
      })

  }

  return (
    <div>
      <Helmet>
        <title>Blogs - Create</title>
      </Helmet>
      <h2>Add a Blog</h2>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <div className="formDiv">
          <form onSubmit={addBlog}>
            <div>
              Title:
                <input id='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
              Author:
                <input id='author' value={newAuthor} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              Website:
                <input id='url' value={newUrl} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}
BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default BlogForm