import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Blog from './Blog'
import userService from '../services/users'
import { useParams } from "react-router-dom"

const User = ({ blogs }) => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  let userBlogs = []

  useEffect(() => {
    userService
      .getById(id)
      .then((r) => setUser(r))
  }, [id])

  if (user) {
    userBlogs = userBlogs.concat(blogs.filter(b => b.user === user.id))
  }

  //TypeError oli nautinto  
  return (
    <div>
      {user ?
        <div>
          <Helmet>
            <title>Blogs - {user.username}</title>
          </Helmet>
          <h2>{user.username}</h2>
          <p>Name: {user.username}</p>
          <p>Blogs added: {userBlogs.length}</p>
          <h4>Blogs</h4>
          <ul>
            {userBlogs.map(blog =>
              <li key={blog.id}>
                <Blog blog={blog} />
              </li>
            )}
          </ul>
        </div>
        :
        <h2>No user by this id</h2>}
    </div >
  )
}

export default User