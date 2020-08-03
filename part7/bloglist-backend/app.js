const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

// Router imports
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')

// Utils imports
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

// App init
const app = express()

// DB init
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Pre-route middleware
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

// Apply routes
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Post-route middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app