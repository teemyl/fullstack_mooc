const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('./../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  
  if (blogToDelete) {
    await Blog.deleteOne(blogToDelete)
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blogToUpdate = await Blog.findById(request.params.id)
  if (blogToUpdate) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogToUpdate.id,
      request.body,
      { new: true }
    )
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter