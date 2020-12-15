import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <div>
      <p>
        <Link to={`/blogs/${blog.id}`}>
          <b>{blog.title.trim()}</b></Link>, by: <em>{blog.author.trim()}.</em>
      </p>
    </div >
  )
}

export default Blog
