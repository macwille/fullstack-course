import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS)
  const books = result.data.allBooks

  if (!show) {
    return null
  }
  if (result.loading) {
    return <p>Loading...</p>
  }
  if (result.error) {
    return <p>Error:{books.error.message}</p>
  }

  const handleFilterChange = (value) => {
    setFilter(value)
  }
  console.log(books)

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books && books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      Filter:{' '}
      <input value={filter} onChange={({ target }) => handleFilterChange(target.value)} />
    </div>
  )
}

export default Books