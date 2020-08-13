import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            books
              .filter(book => genre ? book.genres.includes(genre) : book)
              .map(book =>
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
            )
          }
        </tbody>
      </table>
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