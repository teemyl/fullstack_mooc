const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blog = require('../models/blog')

const api = supertest(app)
  
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map(b => new Blog(b))
  const promiseArr = blogObjs.map(b => b.save())
  
  await Promise.all(promiseArr)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
  res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('blog id key is formatted correctly', async () => {
  res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  newBlog = {
    title: 'adding a new entry',
    author: 'jest test suite',
    url: 'localhost'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = (blogsAtEnd).map(b => b.title)
  expect(titles).toContain('adding a new entry')
})

afterAll(() => {
  mongoose.connection.close()
})