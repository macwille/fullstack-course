import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import EditBirthdate from './EditBirthdate'

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS)
  const authors = result.data.allAuthors

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }
  
  if (result.error) {
    return <div>Error: {result.error.message}</div>
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