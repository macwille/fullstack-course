import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationRefucer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.setMessage(`Added anecdote: ${content}`, 5)

  }

  const style = {
    marginTop: 10
  }

  return (
    <div style={style}>
      <form onSubmit={createNew}>
        <div>
          <button type="submit">Create</button>
          <input name="content" required />
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setMessage,
  createAnecdote
}

const ConnectedForm = connect(
  null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm
