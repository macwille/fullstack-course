/* eslint-disable no-unused-vars */
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
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

  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    authorCount: Int!
    allAuthors: [Author!]
    findAuthor(name: String): Author
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    findBook(name: String!): Book
    hasGenre(genre: String!): [Book!]!
    allUsers: [User!]
    me: User
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
    createUser(
      username: String!
      favouriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
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

    findBook: (root, args) => Book.findOne({ name: args.title }),

    allUsers: (root, args) => User.find({}),

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }

      let book = new Book({ ...args })

      const author = await Author.findOne({ name: args.author })

      if (!author) {
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

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = await User.findOne({ name: args.username })

      if (!user) {
        const newUser = new User({ username: args.username })
        try {
          await newUser.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return newUser
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== '1234' ){
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url: PORT }) => {
  console.log(`Server running at ${PORT}`)
})