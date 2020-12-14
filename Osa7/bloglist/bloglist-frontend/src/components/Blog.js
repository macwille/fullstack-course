import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  return (
    <div>
      <p><b>"{blog.title.trim()}"</b>, by: <em>{blog.author.trim()}.</em></p>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
