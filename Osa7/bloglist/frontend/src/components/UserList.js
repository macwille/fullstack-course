import React from 'react'

const UserList = ({ users }) => {

  const sortedList = users.sort((a, b) => {
    return b.blogs - a.blogs
  })

  return (
    < div >
      <h2>Users</h2>
      <ul>
        {sortedList.map(user =>
          <li key={user.id}>
            {user.username}
          </li>
        )}
      </ul>
    </div >
  )

}

export default UserList