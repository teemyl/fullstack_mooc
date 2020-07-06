require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.POST || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})