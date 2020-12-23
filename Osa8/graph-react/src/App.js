import React, { useState, useEffect } from 'react'
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { ALL_AUTHORS_ALL_BOOKS, ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS_ALL_BOOKS)
  const client = useApolloClient()

  const flashMessage = (flash) => {
    setMessage(flash)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id)
    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
    })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(newBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      updateCacheWith(newBook)
      flashMessage(`Book added ${newBook.title}`)
    },
  })

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
  if (result.loading || !result.data) {
    return <div><h2>Loading..</h2></div>
  }
  if (result.error) {
    return <div>Error: {result.error.message}</div>
  }

  console.log('Quarry:', result)

  if (!token) {
    return (
      <div>
        <Login
          setToken={setToken}
          handleLogout={handleLogout}
          setMessage={setMessage}
        />
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
      {message && <div><h2>{message}</h2></div>}
      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        setMessage={setMessage}
      />
      <Books
        show={page === 'books'}
        books={result.data.allBooks}
        setMessage={setMessage}
      />
      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
        setMessage={setMessage}
      />
    </div>
  )
}

export default App