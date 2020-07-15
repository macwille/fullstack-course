import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {

   const [notes, setNotes] = useState([])
   const [newNote, setNewNote] = useState('a new note...')
   const [showAll, setShowAll] = useState(true)

   // Getting Notes from server

   useEffect(() => {
      noteService
         .getAll()
         .then(initialNotes => {
            setNotes(initialNotes)
         })
   }, [])

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
      noteService
         .create(noteObject)
         .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
         })

   }
   // New note input change

   const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
   }

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
         .update(id, changedNote)
         .then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
         })

   }

   // Show important filter

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
            {notesToShow.map((note, i) =>
               <Note
                  key={i}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
               />
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