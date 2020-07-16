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

  useEffect(() => {
    Service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,

    }

    if (!persons.some(person => person.name === personObject.name)) {
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
    } else {
      window.alert(`${personObject.name} is already added to the phonebook.`)
      console.log('Name already in phonebook.')
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    console.log('person:', person)
    Service.remove(person.id)
      .then(returnedPerson => {
        setPersons(persons.filter(returnedPerson))
      })

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
