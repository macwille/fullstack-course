import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { handleLogout } from './components/Login'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  if (authors.loading || books.loading) {
    return <div><h2>Loading...</h2></div>
  }

  if (!authors || !books) {
    return <div>Error loading data</div>
  }

  if (!token) {
    return (
      <div>
        <Login setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
        {token && <p>Logged in {' '}
        <button onClick={() => handleLogout(setToken)}>Logout</button>
        </p>
        }
      </div>
      <Authors
        authors={authors.data.allAuthors}
        show={page === 'authors'}
      />
      <Books
        books={books.data.allBooks}
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App