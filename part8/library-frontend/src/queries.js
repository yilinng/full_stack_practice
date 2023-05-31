import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ALL_Authors = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }

    allBooks {
      title
      published
      genres
      id
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const All_Books = gql`
  query {
    allBooks {
      title
      published
      genres
      id
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const FILTER_Book = gql`
  query allBooks($author: String, $genres: [String!]) {
    allBooks(author: $author, genres: $genres) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
      id
    }
  }
`

export const USER_Info = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
