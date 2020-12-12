import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationRefucer'
import { useDispatch, useSelector } from 'react-redux'
import Filter from './Filter'
import Notification from './Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)

  const anecdotesList = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatchVote = anecdote => {
    dispatch(vote(anecdote))

    dispatch(setMessage(`Voted for "${anecdote.content}".`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification message={message}></Notification>
      <Filter></Filter>
      <div>
        {anecdotesList.map(anecdote =>
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
    </div>
  )
}
export default AnecdoteList