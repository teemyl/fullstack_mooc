import React, { useState} from 'react'

const Blog = ({ blog }) => {

  const [viewDetails, setViewDetails] = useState(false)

  const renderDetails = () => (
    <>
    { blog.url }<br />
    likes { blog.likes} <button>like</button><br />
    { blog.author }
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
    <div style={ blogStyle }>
      { blog.title }&nbsp;
      <button onClick={ () => setViewDetails(!viewDetails) }>
        { viewDetails ? 'hide' : 'view' }
      </button>
      <br />
      { viewDetails && renderDetails() }
    </div>
  )
}

export default Blog
