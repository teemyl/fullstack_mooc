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
    <div className='blogFormDiv'>
      <form onSubmit={ addBlog }>
        <div className='form-group'>
          <label for='titleInput'>Title</label>
          <input
            id='titleInput'
            type='text'
            value={ blogTitle }
            name='title'
            onChange={ ({ target }) => setBlogTitle(target.value) }
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label for='authorInput'>Author</label>
          <input
            id='authorInput'
            type='text'
            value={ blogAuthor }
            name='author'
            onChange={ ({ target }) => setBlogAuthor(target.value) }
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label for='urlInput'>Url</label>
          <input
          id='urlInput'
          type='text'
          value={ blogUrl }
          name='url'
          onChange={ ({ target }) => setBlogUrl(target.value) }
          className='form-control'
          />
        </div>
        <button id='createBlog' type='submit' className='btn btn-primary'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm