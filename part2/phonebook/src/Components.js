import React from 'react'

export const Notification = ({ message, type }) => {

  const errorStyle = {
    color: 'red',
    background: 'lightpink',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const successStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={ type === "error" ? errorStyle : successStyle }>
      { message }
    </div>
  )
}

export const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={ props.filter } onChange={ props.handleFilterInput } />
    </div>
  )
}

export const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleSubmit,
    handleNameInput,
    handleNumberInput
  } = props

  return (
    <form onSubmit={ handleSubmit }>
      <div>name: <input value={ newName } onChange={ handleNameInput } /></div>
      <div>number: <input value={ newNumber } onChange={ handleNumberInput } /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export const PersonList = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {
        persons
        .filter(person => person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1)
        .map(person => <Person key={ person.id } person={ person } handleDelete={ () => handleDelete(person.id) } />)
      }
    </div>
  )
}

const Person = ({ person, handleDelete }) => (
  <div>
    { person.name } { person.number } <button onClick={ handleDelete } value={ person.id }>delete</button>
  </div>
)