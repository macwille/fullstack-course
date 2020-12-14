import React from 'react'

import blogService from '../services/blogs'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => {

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const addLike = (blog) => {
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        console.log('updated blog', returnedBlog)
        setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      })
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      blogService
        .deleteBlog(blog)
        .then(returnedBlog => {
          console.log('deleted blog', returnedBlog)
          setBlogs(blogs.filter(b => b.id !== returnedBlog.id))
        })
    }
  }

  return (
    < div >
      <h2>Blogs </h2>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id} className="listBlog">
            <Blog blog={blog}></Blog>
            <Togglable buttonLabel='View'>
              <a href={blog.url}> {blog.url}</a> (likes: {blog.likes}) <button onClick={() => addLike(blog)}>Like</button>
              <button onClick={() => handleDelete(blog)}>Delete</button>
            </Togglable>
          </li>
        )}
      </ul>
    </div >
  )
}
export default BlogList