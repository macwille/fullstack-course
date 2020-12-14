import React from 'react'
import { Link } from "react-router-dom"

const UserList = ({ users }) => {

  console.log('User list,', users)

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            <Link to={`/users/${user.id}`}><b>{user.username}</b></Link>  has created {user.blogs.length} blogs.
          </li>
        )}
      </ul>
    </div>
  )

}

export default UserList