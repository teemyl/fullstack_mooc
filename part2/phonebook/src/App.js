import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Filter, PersonForm, PersonList } from './Components'

const App = () => {
  const [ persons, setPersons ] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
      setPersons(persons.concat(newPerson))
      setNewNumber('')
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={ filter } handleFilterInput={ handleFilterInput } />

      <h3>add a new</h3>

      <PersonForm
        newName = { newName }
        newNumber = { newNumber }
        handleSubmit = { handleSubmit }
        handleNameInput = { handleNameInput }
        handleNumberInput = { handleNumberInput }
      />

      <h3>Numbers</h3>

      <PersonList persons={ persons } filter={ filter } />

    </div>
  )
}

export default App