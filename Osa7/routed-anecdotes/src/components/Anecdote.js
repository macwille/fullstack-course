import React from 'react'
import { Link } from 'react-router-dom'


const Anecdote = ({ anecdote, vote, showInfo }) => {

  const handleVote = (event) => {
    event.preventDefault()
    console.log('Voted for:', anecdote.content)
    vote(anecdote.id)
  }

  return (
    <div>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      {showInfo &&
        <div>
          <p>Author: {anecdote.author}</p>
          <p>Url: <a href={anecdote.info}>{anecdote.info}</a></p>
          <p>Votes: {anecdote.votes}</p>
          <button onClick={(e) => handleVote(e)}>Vote</button>
        </div>
      }
    </div >
  )
}

export default Anecdote