import React, { useState } from 'react';
import Person from './components/Person'


// Puhelinluettelo
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,

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
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)

  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

  }


  console.log('filter: ', currentFilter)
  const personsToShow = persons.filter(p => p.name.includes(currentFilter))


  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <h3>Add a new person</h3>
        <form onSubmit={addPerson}>
          Name:
        <input
            value={newPerson}
            onChange={handlePersonChange}
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
      <input
        value={currentFilter}
        onChange={handleFilterChange}

      />
      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} name={person.name} number={person.number}></Person>
        )}
      </ul>
    </div >
  )
}

export default App;
