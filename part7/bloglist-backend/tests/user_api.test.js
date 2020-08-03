const app = require('../app')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const test_helper = require('./test_helper')

const api = supertest(app)


describe('Creation', () => {
  test('fails with proper status code and message if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const res = await api
      .post('/api/users')
      .send({
        username: 'ab',
        name: 'Too Short Username',
        password: 'validpass'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body.error).toContain('is shorter than')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with proper status code and message if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const res = await api
      .post('/api/users')
      .send({
        username: 'validusername',
        name: 'Too Short Password',
        password: 'ab'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body.error).toContain('too short')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      username: 'rootuser',
      name: 'sysadmin',
      passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test-user',
      name: 'Teppo Testaaja',
      password: 'testitepa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rootuser',
      name: 'sysadmin',
      password: 'root'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})