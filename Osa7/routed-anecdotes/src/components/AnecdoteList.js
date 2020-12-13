import React from 'react'
import { useParams } from 'react-router-dom'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes, setAnecdotes, flashMessage }) => {
  const id = useParams().id
  const anecdoteById = anecdotes.find(a => a.id === id)

  const vote = (voteId) => {
    const anecdote = anecdotes.find(a => a.id === voteId)
    flashMessage(`Voted for: "${anecdote.content}".`)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === voteId ? voted : a))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdoteById ?
        <Anecdote anecdote={anecdoteById} vote={vote} showInfo={true}></Anecdote>
        :
        <ul>
          {anecdotes.map(anecdote =>
            <li key={anecdote.id}><Anecdote anecdote={anecdote} vote={vote}></Anecdote></li>)}
        </ul>
      }
    </div>
  )
}

export default AnecdoteList