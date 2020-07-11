import React, { useState } from 'react'
import Note from './components/Note'

// Main App
const App = (props) => {

   const [notes, setNotes] = useState(props.notes)
   const [newNote, setNewNote] = useState('a new note...')
   const [showAll, setShowAll] = useState(true)

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