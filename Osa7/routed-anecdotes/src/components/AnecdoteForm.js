import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'


const AnecdoteForm = ({ setAnecdotes, anecdotes, flashMessage }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const history = useHistory()

  const addNew = (anecdote) => {
    console.log('Add new ', anecdote)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleReset = (event) => {
    event.preventDefault()
    console.log('Reset all')
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = () => {
    const getContent = content.value

    addNew({
      content: getContent,
      author: author.value,
      info: info.value,
      votes: 0
    })
    if (getContent) {
      history.push('/')
      flashMessage(`Created: "${getContent}".`)
    }
  }

  // If it works.. it works.
  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input {...content} reset={null} />
        </div>
        <div>
          Author:
          <input {...author} reset={null} />
        </div>
        <div>
          URL for more info:
          <input {...info} reset={null} />
        </div>
        <button type="submit">Create</button>
        <button onClick={(e) => handleReset(e)}>Reset</button>
      </form>
    </div >
  )
}

export default AnecdoteForm