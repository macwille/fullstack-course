import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Blog from './Blog'
import Loading from './Loading'
import userService from '../services/users'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

const User = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  useEffect(() => {
    userService
      .getById(id)
      .then((r) => setUser(r))
  }, [id])

  if (!user) {

    return (
      <Loading />
    )
  } else {
    const userBlogs = blogs.filter(b => b.user === user.id)

    return (
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
      </div >
    )
  }
}

export default User