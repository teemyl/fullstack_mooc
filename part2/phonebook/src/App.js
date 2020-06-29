import React, { useState } from 'react'

import { Filter, PersonForm, PersonList } from './Components'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

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