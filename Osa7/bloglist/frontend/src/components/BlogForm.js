import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { setReduxblogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

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
        dispatch(setReduxblogs(blogs.concat(returnedBlog)))
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
        <form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control id='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            <Form.Label>Author:</Form.Label>
            <Form.Control id='author' value={newAuthor} onChange={({ target }) => setAuthor(target.value)} />
            <Form.Label>Website:</Form.Label>
            <Form.Control id='url' value={newUrl} onChange={({ target }) => setUrl(target.value)} />
            <Button type="submit">Create</Button>
          </Form.Group>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm