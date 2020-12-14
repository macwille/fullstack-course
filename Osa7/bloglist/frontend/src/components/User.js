import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useParams } from "react-router-dom"

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService
      .getById(id)
      .then((r) => setUser(r))
  }, [id])

  //TypeError oli nautinto  
  return (
    <div>
      {user ?
        <div>
          <h2>{user.username}</h2>
          <p>Name: {user.username}</p>
          <p>Blogs added: {user.blogs.length}</p>
        </div>
        :
        <h2>No user by this id</h2>}
    </div >
  )
}

export default User