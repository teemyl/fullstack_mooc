import React, { useState, useEffect } from 'react'

import { Filter, PersonForm, PersonList } from './Components'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleFilterInput = (event) => setNewFilter(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (persons.findIndex(obj => obj.name === newName) > -1)
      alert(`${ newName } is already added to phonebook`)
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={ filter } handleFilterInput={ (e) => handleFilterInput(e) } />

      <h3>add a new</h3>

      <PersonForm
        newName = { newName }
        newNumber = { newNumber }
        handleSubmit = { (e) => handleSubmit(e) }
        handleNameInput = { (e) => handleNameInput(e) }
        handleNumberInput = { (e) => handleNumberInput(e) }
      />

      <h3>Numbers</h3>

      <PersonList persons={ persons } filter={ filter } />

    </div>
  )
}

export default App