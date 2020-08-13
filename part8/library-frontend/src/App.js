
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })

    if(!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert(`New book '${ addedBook.title }' added`)
    }
  })

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
        <NewBook show={ page === 'add' } updateCacheWith={ updateCacheWith }/>
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