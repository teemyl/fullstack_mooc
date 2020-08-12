import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      id
      name
    }
    published
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const AUTHOR_SETBORN = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    id
    bookCount
    born
  }
}
`

