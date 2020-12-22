import React from 'react'

const Users = ({ users }) => {

  return (
    <div>
      <h4>Users</h4>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Favourite</th>
          </tr>
          {users.map(u =>
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.favouriteGenre}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
    </div>
  )
}

export default Users