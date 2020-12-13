import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationRefucer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const dispatchVote = anecdote => {
    props.vote(anecdote)
    props.setMessage(`Voted for "${anecdote.content}".`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatchVote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes,
    }
  }
  return {
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())),
  }
}

const mapDispatchToProps = {
  vote,
  setMessage
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes