import React, { useState, useEffect } from 'react';
import Service from './services/personService'
import Person from './components/Person'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'


// Puhelinluettelo
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setFilter] = useState('')

  // Get All
  const hook = () => {
    Service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])



  // Add

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,

    }

    if (persons.some(person => person.name !== personObject.name)) {
      if (personObject.name.length > 0) {
        console.log('New person object: ', personObject)
        Service
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
      } else {
        console.log('Name field was empty.')
      }

      // Update number
    } else {
      if (window.confirm(`Update number for ${personObject.name} ?`)) {
        const updatedPerson = persons.find(person => person.name === personObject.name)
        console.log('updating number for ', updatedPerson)
        Service.update(updatedPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          })

      }
    }
  }
  // Delete
  const deletePerson = id => {

    const person = persons.find(p => p.id === id)
    // Confirm window
    if (window.confirm(`Do you want to remove ${person.name} ?`)) {
      console.log('person:', person)
      Service.remove(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        ).catch(error => {
          console.log('Person already deleted:', error)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      console.log('filter person: ', person)
    }
  }


  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  const personsToShow = persons.filter(p => p.name.includes(currentFilter))


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter currentFilter={currentFilter} handleFilterChange={handleFilterChange} personsToShow={personsToShow} />
      <Phonebook addPerson={addPerson} setNewNumber={setNewNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <br></br>
      <h1>Numbers, {persons.length} in total</h1>
      <ul>
        {personsToShow.map((person, i) =>
          <Person
            key={i}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person.id)} />
        )}
      </ul>
    </div >
  )
}

export default App;
