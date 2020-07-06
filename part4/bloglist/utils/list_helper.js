const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, b) => sum += b.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null
  return blogs.reduce(
    (prev, curr) => curr.likes > prev.likes ? curr : prev,
    blogs[0]
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}