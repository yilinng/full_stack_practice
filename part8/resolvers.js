const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find().populate('author')
      if ('author' in args || 'genres' in args) {
        console.log('allbook args root', root, args)

        if ('author' in args && 'genres' in args) {
          return books.filter(
            (book) =>
              book.author.name === args.author &&
              book.genres.some((genre) => args.genres.includes(genre))
          )
        }

        return books.filter(
          (book) =>
            book.author.name === args.author ||
            book.genres.includes(args.genres)
        )
      }
      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,

    bookCount: async (root) => {
      // console.log('root', root)

      let count = 0
      const books = await Book.find({})
      console.log('books bookCount', books)
      //http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#equals
      books.map((book) => {
        // console.log('book.author == root._id', book.author.equals(root._id))
        if (book.author.equals(root._id)) {
          count = count + 1
        }
      })

      return count
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      console.log('addbook args', args)
      console.log('currentUser', currentUser)

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let book = { ...args }

      const findAuthor = await Author.findOne({ name: book.author })
      console.log('add book', book)
      if (findAuthor) {
        book = new Book({ ...book, author: findAuthor })
      } else {
        let author = new Author({ name: book.author })
        await author.save()
        book = new Book({ ...book, author })
      }

      try {
        await book.save()
      } catch (error) {
        console.log('error', error)
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.name })

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        console.log('error', error)
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
