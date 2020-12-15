import React from 'react'
import { Helmet } from 'react-helmet'
import { Table } from 'react-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap'

import blogService from '../services/blogs'
import Togglable from './Togglable'
import Blog from './Blog'
import { setMessage } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogList = ({ blogs, setBlogs }) => {
  const dispatch = useDispatch()

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const addLike = (blog) => {
    dispatch(setMessage(`You liked "${blog.title}".`))
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      })
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      dispatch(setMessage(`You deleted "${blog.title}".`))
      blogService
        .deleteBlog(blog)
        .then(returnedBlog => {
          setBlogs(blogs.filter(b => b.id !== returnedBlog.id))
        })
    }
  }

  return (
    < div >
      <Helmet>
        <title>Blogs - Blogs</title>
      </Helmet>
      <h2>Blogs </h2>
      <Table striped>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id} className="listBlog">
              <td>
                <Blog blog={blog} />
                <Togglable buttonLabel='View'>
                  <a href={blog.url}> {blog.url}</a> (likes: {blog.likes})
                  <ButtonGroup>
                    <Button onClick={() => addLike(blog)}>Like</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button onClick={() => handleDelete(blog)}>Delete</Button>
                  </ButtonGroup>
                </Togglable>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div >
  )
}
export default BlogList