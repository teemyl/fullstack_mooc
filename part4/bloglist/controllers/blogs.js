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