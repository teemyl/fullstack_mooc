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
describe('when there\'s initially some blogs saved', () => {
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
})

describe('adding of a new blog', () => {
  test('succeeds with valid data', async () => {
    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite',
      url: 'localhost',
      likes: 1
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

  test('without likes defaults likes to zero', async () => {
    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite',
      url: 'localhost'
    }
  
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(res.body.likes).toBe(0)
  })
  
  test('without title fails with status code 400', async () => {
    newBlog = {
      author: 'jest test suite',
      url: 'localhost'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  
  test('without url fails with status code 400', async () => {
    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${ blogToDelete.id }`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const titles = blogsAtEnd.map(b => {
      return {title: b.title, author: b.author}
    })

    expect(titles).not.toContainEqual(
      { title: blogToDelete.title, author: blogToDelete.author}
    )
  })
  
  test('fails with status code 404 if id is invalid', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${ nonExistingId }`)
      .expect(404)
  })
})


afterAll(() => {
  mongoose.connection.close()
})