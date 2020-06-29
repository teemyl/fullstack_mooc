import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameInput = (event) => setNewName(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newNameObject = { name: newName}

    if (persons.findIndex(obj => obj.name === newName) > -1)
      alert(`${ newName } is already added to phonebook`)
    else {
      setPersons(persons.concat(newNameObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          name: <input value={ newName } onChange={ handleNameInput }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={ person.name }>{ person.name }</div>)
      }
    </div>
  )
}

export default App