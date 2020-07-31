import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog }) => {

  const [viewDetails, setViewDetails] = useState(false)
  const dispatch = useDispatch()

  const handleLike = () => {    
    dispatch(
      updateBlog({ ...blog, likes: blog.likes + 1 })
    )
  }

  const handleRemove = () => {
    const result = window.confirm(`Remove ${ blog.title } ny ${ blog.author }?`)
    if (result)
      dispatch(removeBlog(blog))
  }

  const renderDetails = () => (
    <>
      { blog.url }<br />
      likes <span className='likeCount'>{ blog.likes}</span> <button className='likeButton' onClick={ handleLike }>like</button><br />
      {
        user.username === blog.user.username
        && <button className='removeButton' onClick={ handleRemove }>remove</button>
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
      <button className='toggleViewButton' onClick={ () => setViewDetails(!viewDetails) }>
        { viewDetails ? 'hide' : 'view' }
      </button>
      <br />
      { viewDetails && renderDetails() }
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
