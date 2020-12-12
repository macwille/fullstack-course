import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationRefucer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setMessage(`Added "${content}".`, 5))

  }
  const style = {
    marginTop: 10
  }

  return (
    <div style={style}>
      <form onSubmit={addNew}>
        <div>
          <button type="submit">Create</button>
          <input name="content" required />
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm