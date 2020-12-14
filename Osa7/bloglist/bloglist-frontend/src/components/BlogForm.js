import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleURLchange = (event) => {
    setUrl(event.target.value)
  }

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

  return (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <div className="formDiv">
        <form onSubmit={addBlog}>
          <h2>Add a Blog</h2>
          <div>
            Title:
                <input id='title' value={newTitle} onChange={handleTitleChange} />
          </div>
          <div>
            Author:
                <input id='author' value={newAuthor} onChange={handleAuthorChange} />
          </div>
          <div>
            Website:
                <input id='url' value={newUrl} onChange={handleURLchange} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </Togglable>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm