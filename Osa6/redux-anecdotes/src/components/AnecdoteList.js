import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationRefucer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotesToShow = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatchVote = anecdote => {
    dispatch(vote(anecdote))
    dispatch(setMessage(`Voted for "${anecdote.content}".`, 5))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatchVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList