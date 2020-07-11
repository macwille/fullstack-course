import React, { useState } from 'react';

// Puhelinluettelo
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // const [showNumbers, setShowNumbers] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
      date: new Date().toISOString,

    }

    if (!persons.some(person => person.name === personObject.name)) {
      if (personObject.name.length > 0) {
        console.log('added a new person: ', personObject)
        setPersons(persons.concat(personObject))
        setNewPerson('')
        setNewNumber('')

      } else {
        console.log('Name field was empty.')
      }
    } else {
      window.alert(`${personObject.name} is already added to the phonebook.`)
      console.log('Name already in phonebook.')
    }

  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)

  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <h3>Add a new person</h3>
        <form onSubmit={addPerson}>
          Name:
        <input
            value={newPerson}
            onChange={handleNoteChange}
          />
          <br></br>
        Number:
        <input
            value={newNumber}
            onChange={handleNumberChange}
          />
          <br></br>
          <button type="submit">Save</button>
        </form>
      </div>
      <h1>Numbers</h1>
      Filter:
      <input></input>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div >
  )
}

export default App;
