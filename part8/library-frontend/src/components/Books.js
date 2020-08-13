import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)

  const [genre, setGenre] = useState('')
  
  if (!props.show) {
    return null
  }

  const getGenreList = (b) => {
    const g = b.reduce((prev, curr) => {
      return prev.concat(curr.genres)
    }, [])
    return [...new Set(g)]
  }

  const books = result.data.allBooks
  const genres = getGenreList(books)

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
          <button key={ i } onClick={ () => setGenre(g) }>{ g }</button>)
        )
      }
      <button onClick={ () => setGenre('') }>all genres</button>
    </div>
  )
}

export default Books