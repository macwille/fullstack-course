import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const AnecdoteForm = ({ setAnecdotes, anecdotes, flashMessage }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    if (content) {
      history.push('/')
      flashMessage(`Created: "${content}".`)
    }
  }

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          Author:
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          URL for more info:
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div >
  )
}

export default AnecdoteForm