import React, { useState, useEffect } from 'react'

import { Filter, PersonForm, PersonList, Notification } from './Components'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleFilterInput = (event) => setNewFilter(event.target.value)

  const displaySuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const displayError = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (persons.findIndex(p => p.name === newName) > -1) {
      const result = window.confirm(`${ newName } is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const existingPerson = persons.find(p => p.name === newName)
        personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson))
            displaySuccess(`Updated ${ updatedPerson.name }`)
          })
          .catch(error => {
            displayError(error.response.data.error)
          })
      }
    }
    else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewNumber('')
          setNewName('')
          displaySuccess(`Created ${ createdPerson.name }`)
        })
        .catch(error => {
          displayError(error.response.data.error)
        })
    }
  }

  const handleDelete = (id) => {
    const deleteObject = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${ deleteObject.name }`)
    if (result)
      personService
        .remove(deleteObject.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          displayError(`Person '${ deleteObject.name }' was already removed from server`)
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={ errorMessage } type="error" />
      <Notification message={ successMessage } type="success" />

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

      <PersonList
        persons={ persons }
        filter={ filter }
        handleDelete = { handleDelete }
      />

    </div>
  )
}

export default App