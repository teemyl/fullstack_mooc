import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }
  
  return (
    <div>
      <form onSubmit={ addBlog }>
        title:
        <input
          type='text'
          value={ blogTitle }
          name='title'
          onChange={ ({ target }) => setBlogTitle(target.value) }
        /><br />
        author:
        <input
          type='text'
          value={ blogAuthor }
          name='author'
          onChange={ ({ target }) => setBlogAuthor(target.value) }
        /><br />
        url:
        <input
          type='text'
          value={ blogUrl }
          name='url'
          onChange={ ({ target }) => setBlogUrl(target.value) }
        /><br />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm