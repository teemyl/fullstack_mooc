const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const blogs = helper.initialBlogs

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

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBeNull()
  })

  test('of list with one entry to return the corresponding author and like count', () => {
    const listWithOneBlog = [blogs[0]]
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({author: 'Michael Chan', likes: 7})
  })

  test('of list with multiple entries to be author with most combined likes', () => {
    const result = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(listHelper.mostLikes(blogs)).toEqual(result)
  })
})