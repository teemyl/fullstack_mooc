const blogsRouter = require('express').Router()
const Blog = require('./../models/blog')
const { result } = require('lodash')
const blog = require('./../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id)
  const blogToDelete = await Blog.findById(request.params.id)
  
  if (blogToDelete) {
    await Blog.deleteOne(blogToDelete)
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter