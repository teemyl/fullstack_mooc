import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommend = (props) => {

  const result = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }

  const user = result.data.me
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genre <b>{ user.favoriteGenre }</b>
      <BookTable books={ books } genre={ user.favoriteGenre } />
    </div>
  )
}

export default Recommend