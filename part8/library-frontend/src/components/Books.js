import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
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