import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const dispatchNew = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(createAnecdote(content))
        event.target.content.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={dispatchNew}>
                <div><input name="content" required /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm