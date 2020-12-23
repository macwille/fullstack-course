import React from 'react'
import EditBirthdate from './EditBirthdate'

const Authors = ({ show, authors }) => {

  if (!show) {
    return null
  }
  if (!authors) {
    return <div>No data</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors && authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditBirthdate authors={authors} />
    </div>
  )
}

export default Authors