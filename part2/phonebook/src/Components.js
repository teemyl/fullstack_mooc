import React from 'react'

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

export const PersonList = ({ persons, filter }) => {
  return (
    <div>
      {
        persons
        .filter(person => person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1)
        .map(person => <Person key={ person.name } person={ person } />)
      }
    </div>
  )
}

const Person = ({ person }) => <div>{ person.name } { person.number }</div>