import React from 'react'
import Note from './components/Note'

const App = ({notes}) => {
   console.log(notes)

   const rows = () => notes.map(note =>
      <Note
       key={note.id}
       note={note}
       />
      )

      console.log('App toimii...')
      

   return (
      <div>
         <h1>Notes</h1>
         <ul>
            {rows()}
         </ul>
      </div>
   )

}

export default App