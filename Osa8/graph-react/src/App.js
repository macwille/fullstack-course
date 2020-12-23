import { useApolloClient } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    if (storageToken) {
      console.log('Token set')
      setToken(storageToken)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Login setToken={setToken} handleLogout={handleLogout} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
        {token && <button onClick={(e) => handleLogout(e)}>Logout</button>}
      </div>
      <Authors
        show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App