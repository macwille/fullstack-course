import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {

   const [notes, setNotes] = useState([])
   const [newNote, setNewNote] = useState('a new note...')
   const [showAll, setShowAll] = useState(true)

   // Getting Notes from server

   const hook = () => {
      console.log('Notes effect')
      axios
         .get('http://localhost:3001')
         .then(r => {
            console.log('promise fulfilled,' + r.data)
            setNotes(r.data)
         })
   }

   useEffect(hook, [])

   // Adding a new note
   const addNote = (event) => {
      event.preventDefault()
      console.log('button clicked ', event.target)
      const noteObject = {
         content: newNote,
         date: new Date().toISOString,
         important: Math.random() > 0.5,
         id: notes.length + 1,
      }
      console.log('added new note: ', noteObject)
      setNotes(notes.concat(noteObject))
      setNewNote('you have ' + (notes.length + 1) + ' notes...')

   }
   // New note input change

   const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
   }

   const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important === true)


   // Return body
   return (
      <div>
         <h1>Notes</h1>
         <div>
            <button onClick={() => setShowAll(!showAll)} >
               show {showAll ? 'only important' : 'all'} notes
            </button>
         </div>
         <ul>
            {notesToShow.map(note =>
               < Note key={note.id} note={note} />
            )}
         </ul>

         <form onSubmit={addNote}>
            <input
               value={newNote}
               onChange={handleNoteChange}
            />
            <button type="submit">save</button>
         </form>
      </div>
   )

}

export default App