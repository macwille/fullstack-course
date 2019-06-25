import React from 'react'

const Note = ({note}) => {
   console.log(note)
   console.log('Note toimii...')
   return (
      <li>{note.content}</li>
   )
}

export default Note