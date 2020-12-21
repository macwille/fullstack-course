/* eslint-disable no-unused-vars */
require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    born: Int!
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: String
    genres: [String!]
    id: ID!
  }
  
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String): Author
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(name: String!): Book
    hasGenre(genre: String!): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Author: {

    name: (root) => root.name,

    born: (root) => {
      if (!root.born) {
        return 0
      }
      return root.born
    },

    bookCount: (root) => 0
  },

  Book: {
    title: (root) => root.title,

    published: (root) => root.published,

    author: (root) => root.author,

    genres: (root) => root.genres
  },

  Query: {
    authorCount: () => Author.collection.countDocuments(),

    allAuthors: (root, args) => Author.find({}),

    findAuthor: (root, args) => Author.findOne({ name: args.name }),

    bookCount: () => Book.collection.countDocuments(),

    allBooks: async (root, args) => { return Book.find({}).populate('author') },
    /*
    if (args.author && !args.genre) {
      return Book.filter(b => b.author === args.author)
    }

    if (args.genre && !args.author) {
      return Book.filter(b => b.genres.includes(args.genre))
    }
    return Book.
      filter(b => b.author === args.author).
      filter(b => b.genres.includes(args.genre))
      */

    findBook: (root, args) => Book.findOne({ name: args.title })
  },

  Mutation: {

    addBook: (root, args) => {
      console.log('Add book', args)

      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title,
        })
      }
      const book = new Book({ ...args, id: uuid() })
      console.log('Created book:', book)
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      console.log('Edit author', author, args)
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`)
})