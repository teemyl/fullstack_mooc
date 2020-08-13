import React, { useState, useEffect } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const [getBooks, { loading, data, refetch }] = useLazyQuery(ALL_BOOKS)

  const [genre, setGenre] = useState('')
  const [genres, setGenreList] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks({ variables: { genre: genre } })
  }, [genre, getBooks])

  useEffect(() => {
    if (data && data.allBooks) {
      const newGenres = data.allBooks.reduce((prev, curr) => {
        return prev.concat(curr.genres)
      }, [])
      setGenreList([...new Set(genres.concat(newGenres))])
      setBooks(data.allBooks)
    }
  }, [data]) // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      props.updateCacheWith(addedBook)
      setBooks(books.concat(addedBook))
      window.alert(`New book '${ addedBook.title }' added`)
    }
  })

  const handleClick = async (newGenre) => {
    await refetch()
    setGenre(newGenre)
  }
  
  if (!props.show) {
    return null
  }

  if (loading) return <p>loading...</p>

  return (
    <div>
      <h2>books</h2>
      {
        genre &&
        <div>in genre <b>{ genre }</b></div>
      }
      <BookTable books={ books } genre={ genre } />
      {
        genres.map((g, i) => (
          <button key={ i } onClick={ () => handleClick(g) }>{ g }</button>)
        )
      }
      <button onClick={ () => handleClick('') }>all genres</button>
    </div>
  )
}

export default Books