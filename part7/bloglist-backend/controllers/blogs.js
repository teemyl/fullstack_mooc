const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('./../models/blog')
const User = require('../models/user')

const decodeToken = request => jwt.verify(request.token, process.env.SECRET)
const invalidTokenError = response => response.status(401).json({ error: 'token missing or invalid' })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = decodeToken(request)

  if (!decodedToken.id) {
    return invalidTokenError(response)
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
  const decodedToken = decodeToken(request)

  if (!decodedToken.id) {
    return invalidTokenError(response)
  }

  const blog = await Blog.findById(request.params.id)

  if (blog && blog.user.toString() === decodedToken.id) {
    await Blog.deleteOne(blog)
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
    ).populate('user', { username: 1, name: 1 })
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  
  const decodedToken = decodeToken(request)

  if (!decodedToken.id) {
    return invalidTokenError(response)
  }
  
  const user = await User.findById(decodedToken.id)

  if(!user)
    response.status(403).end()

  if (blogToUpdate) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogToUpdate.id,
      { comments: [ ...blogToUpdate.comments, request.body.comment ] },
      { new: true }
    )
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter