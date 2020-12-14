import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogList = (props) => {
  const blogs = props.blogs

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    < div >
      <h2>Blogs </h2>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id} className="listBlog">
            <Blog blog={blog}></Blog>
            <Togglable buttonLabel='View'>
              <a href={blog.url}> {blog.url}</a> (likes: {blog.likes}) <button onClick={() => props.addLike(blog)}>Like</button>
              <button onClick={() => props.handleDelete(blog)}>Delete</button>
            </Togglable>
          </li>
        )}
      </ul>
    </div >
  )
}
export default BlogList