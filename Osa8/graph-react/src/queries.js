import { gql } from '@apollo/client'

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
      title
      author
      published
      id
    }
  }
`
export const FIND_BOOK = gql`
  query findBook($authorName: String, $genre: String) {
    findBook(author: $authorName, genre: $genre) {
      name
      title 
      author
      published
      id
    }
  }
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
      title
      published
      author
      genres
    }
  }
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
