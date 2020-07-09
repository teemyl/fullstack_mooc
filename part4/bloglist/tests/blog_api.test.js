const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
  
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)

  const user = new User({
    username: 'testuser',
    name: 'sysadmin',
    passwordHash
  })

  await user.save()

  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map(b => new Blog({ ...b, user: user.id }))
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
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite',
      url: 'localhost',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ token }`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = (blogsAtEnd).map(b => b.title)
    expect(titles).toContain('adding a new entry')
  })

  test('without likes defaults likes to zero', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite',
      url: 'localhost'
    }
  
    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ token }`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(res.body.likes).toBe(0)
  })
  
  test('without title fails with status code 400', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    const newBlog = {
      author: 'jest test suite',
      url: 'localhost'
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ token }`)
      .send(newBlog)
      .expect(400)
  })
  
  test('without url fails with status code 400', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite'
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ token }`)
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 401 if token is invalid or missing', async () => {
    const newBlog = {
      title: 'adding a new entry',
      author: 'jest test suite',
      url: 'localhost',
      likes: 1
    }

    await api
      .post(`/api/blogs`)
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${ blogToDelete.id }`)
      .set('Authorization', `Bearer ${ token }`)
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
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)

    const token = loginResponse.body.token

    const nonExistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${ nonExistingId }`)
      .set('Authorization', `Bearer ${ token }`)
      .expect(404)
  })

  test('fails with status code 401 if token is invalid or missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${ blogToDelete.id }`)
      .expect(401)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 200 if id is valid and returns the updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    console.log(blogToUpdate)
    
    const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}

    const res = await api
      .put(`/api/blogs/${ blogToUpdate.id }`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(blogToUpdate.likes + 1)
  })

  test('fails with status code 404 if id is invalid', async () => {
    const nonExistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${ nonExistingId }`)
      .expect(404)
  })
})


afterAll(() => {
  mongoose.connection.close()
})