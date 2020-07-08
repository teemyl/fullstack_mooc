const blogsRouter = require('express').Router()
const Blog = require('./../models/blog')
const { result } = require('lodash')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.json(result.toJSON())
})

module.exports = blogsRouter