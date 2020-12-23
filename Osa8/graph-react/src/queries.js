import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author
    genres
    id
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

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS_ALL_BOOKS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_USERS = gql`
  query {
    allUsers  {
      username
      favouriteGenre
      id
    }
  }
`
export const FIND_BOOK = gql`
  query findBook($authorName: String, $genre: String) {
    findBook(author: $authorName, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const EDIT_BIRTHDAY = gql`
  mutation editBirthday($name: String!, $born: Int!) {
    editAuthor(
      name: $name
      setBornTo: $born
    ){
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation userLogin($username: String! $password: String!) {
    login(
      username: $username
      password: $password
    ){
      value
    }
  }
`