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

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
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
      published: Int
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
    bookCount: (root) => 0
  },

  Query: {
    authorCount: () => Author.collection.countDocuments(),

    allAuthors: (root, args) => Author.find({}),

    findAuthor: (root, args) => Author.findOne({ name: args.name }),

    bookCount: () => Book.collection.countDocuments(),

    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } })
      }
      return Book.find({})
    },
    /*
   
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

    addBook: async (root, args) => {

      let book = new Book({ ...args })

      const author = await Author.findOne({ name: args.author })

      if (!author) {
        console.log('New author')
        const newAuth = new Author({ name: args.author, born: 0 })
        try {
          await newAuth.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        book.author = newAuth.name
      } else {
        book.author = author.name
      }
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
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

server.listen().then(({ url: PORT }) => {
  console.log(`Server running at ${PORT}`)
})