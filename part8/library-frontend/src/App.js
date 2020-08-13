
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (token && page === 'login') setPage('authors')

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const loggedInUserActions = () => {
    return (
      <>
        <button onClick={ () => setPage('add') }>add book</button>
        <button onClick={ () => setPage('recommend') }>recommend</button>
        <button onClick={ logout }>logout</button>
      </>
    )
  }

  const loggedInUserPages = () => {
    return (
      <>
        <NewBook show={ page === 'add' } />
        <Recommend show={ page === 'recommend' } />
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={ () => setPage('authors') }>authors</button>
        <button onClick={ () => setPage('books') }>books</button>
        {
          token
          ? loggedInUserActions()
          : <button onClick={ () => setPage('login') }>login</button>
        }
      </div>

      <Authors show={ page === 'authors' } loggedIn={ token ? true : false } />
      <Books show={ page === 'books' } />

      {
        token
        ? loggedInUserPages()
        : <Login show={ page === 'login' } setToken={ setToken }/>
      }
    
    </div>
  )
}

export default App