import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Menu from './components/Menu'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const flashMessage = message => {
    setTimeout(() => {
      setNotification('')
    }, 5000)
    setNotification(message)
  }

  return (
    <Router>
      <h1>Software Anecdotes</h1>
      <Menu />
      <p>{notification}</p>
      <Switch>
        <Route path="/create">
          <AnecdoteForm setAnecdotes={setAnecdotes} anecdotes={anecdotes} flashMessage={flashMessage} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} flashMessage={flashMessage} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
