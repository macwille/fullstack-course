import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {

  return (
    <div>
      <Helmet>
        <title>Blogs - Users</title>
      </Helmet>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}><b>{user.username}</b></Link>  has created {user.blogs.length} blogs.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

}

export default UserList