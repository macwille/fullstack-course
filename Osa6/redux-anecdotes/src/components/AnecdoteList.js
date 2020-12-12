import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const dispatchVote = (id) => {
        dispatch(vote(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
            <button onClick={() => dispatchVote(anecdote.id)}>Vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList