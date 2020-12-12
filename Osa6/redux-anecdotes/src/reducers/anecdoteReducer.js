
import anecdoteService from '../services/anecdotes'

export const vote = (anecdote) => {
  return async dispatch => {
    const toChange = { ...anecdote, votes: anecdote.votes + 1 }
    const updated = await anecdoteService.update(anecdote.id, toChange)
    const id = updated.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE_NEW',
      data: newAnecdote,
    })
  }
}

export const initilizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changed)
        .sort(function (x, y) {
          return y.votes - x.votes
        })

    case 'CREATE_NEW':
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer