import React, { useState } from 'react';
import Person from './components/Person'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'


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
      <h1>Phonebook</h1>
      <Filter currentFilter={currentFilter} handleFilterChange={handleFilterChange} personsToShow={personsToShow} />
      <Phonebook addPerson={addPerson} setNewNumber={setNewNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <br></br>
      <h1>Numbers, {persons.length} in total</h1>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} name={person.name} number={person.number}></Person>
        )}
      </ul>
    </div >
  )
}

export default App;
