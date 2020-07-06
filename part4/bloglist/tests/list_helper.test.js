const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of list with multiple entries is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBeNull()
  })

  test('of list with one entry to return that entry', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blogs[0])
  })

  test('of list with multiple entries to return the one with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBeNull()
  })

  test('of list with one entry to be author of that with blog count of 1', () => {
    const listWithOneBlog = [blogs[0]]
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({author: 'Michael Chan', blogs: 1})
  })

  test('of list with multiple entries to be author with most blogs', () => {
    const result = { author: 'Robert C. Martin', blogs: 3 }
    expect(listHelper.mostBlogs(blogs)).toEqual(result)
  })
})