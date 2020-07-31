import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogListItem = ({ blog }) => {

  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    padding: 5
  }

  return (
    <div className='blog' style={ blogStyle }>
      <Link to={`/blogs/${ blog.id }`}>{ blog.title } by { blog.author }&nbsp;</Link>
    </div>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem
