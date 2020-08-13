import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommend = (props) => {

  const result = useQuery(ME)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data && result.data.me) {
      getBooks({ variables: { genre: result.data.me.favoriteGenre } })
    }
  }, [result, getBooks])

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(books.concat(data.allBooks))
    }
  }, [data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (loading) return <p>loading...</p>

  const user = result.data.me

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genre <b>{ user.favoriteGenre }</b>
      <BookTable books={ books } genre={ user.favoriteGenre } />
    </div>
  )
}

export default Recommend