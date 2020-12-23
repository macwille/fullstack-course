import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState('')
  const toShow = books.filter((book) => {
    if (filter !== '') {
      console.log('Genres:', book.genres)
      return book.genres.includes(filter)
    }
    return books
  })

  if (!show) {
    return null
  }

  const handleFilterChange = (value) => {
    setFilter(value)
  }

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
          {books && toShow.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      Genre:{' '}
      <input value={filter} onChange={({ target }) => handleFilterChange(target.value)} />
    </div>
  )
}

export default Books