import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {

  const [viewDetails, setViewDetails] = useState(false)

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  const renderDetails = () => (
    <>
      { blog.url }<br />
      likes { blog.likes} <button className='likeButton' onClick={ handleLike }>like</button><br />
      {
        user.username === blog.user.username
        && <button onClick={ handleRemove }>remove</button>
      }
    </>
  )

  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    padding: 5
  }

  return (
    <div className='blog' style={ blogStyle }>
      { blog.title } by { blog.author }&nbsp;
      <button class='toggleViewButton' onClick={ () => setViewDetails(!viewDetails) }>
        { viewDetails ? 'hide' : 'view' }
      </button>
      <br />
      { viewDetails && renderDetails() }
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.func.isRequired,
  blog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
