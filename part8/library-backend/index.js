const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const config = require('./config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { JWT_SECRET } = require('./config')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = config.MONGODB_URI

console.log(`Connecting to`, config.MONGODB_URI)

mongoose.connect(
  config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: String!
    bookCount: Int
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ) : Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      try {
        if (args.genre)
          return Book.find({ genres: { $in: [args.genre] } }).populate('author')

        return Book.find({}).populate('author')
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError("Access denied")
      }

      const book = new Book({ ...args })
      
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError("Access denied")
      }
      try {
        return await Author.findOneAndUpdate(
          { name: args.name},
          { born: args.setBornTo }
        )
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        return await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'pass' ) {
        throw new UserInputError("Invalid credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})