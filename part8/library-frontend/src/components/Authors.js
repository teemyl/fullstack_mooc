  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, AUTHOR_SETBORN } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ setBornTo ] = useMutation(AUTHOR_SETBORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const updateBirthYear = (event) => {
    event.preventDefault()

    setBornTo({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={ updateBirthYear }>
        name <input type='text' onChange={ ({ target }) => setName(target.value) } value={ name }/><br />
        born <input type='text' onChange={ ({ target }) => setBorn(target.value) } value={ born }/><br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
