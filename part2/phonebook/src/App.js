import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
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
      <div>
        filter shown with <input value={ filter } onChange={ handleFilterInput } />
      </div>
      <h2>add a new</h2>
      <form onSubmit={ handleSubmit }>
        <div>name: <input value={ newName } onChange={ handleNameInput } /></div>
        <div>number: <input value={ newNumber } onChange={ handleNumberInput } /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
        persons
        .filter(person => person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1)
        .map(person => <div key={ person.name }>{ person.name } { person.number }</div>)
      }
    </div>
  )
}

export default App