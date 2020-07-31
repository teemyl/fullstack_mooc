import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch()

  if (!blog)
    return <Redirect to='/' />

  const handleLike = () => {    
    dispatch(
      updateBlog({ ...blog, likes: blog.likes + 1 })
    )
  }

  const handleRemove = () => {
    const result = window.confirm(`Remove ${ blog.title } ny ${ blog.author }?`)
    if (result) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <h1>{ blog.title }</h1>
      <a href={ blog.url }>{ blog.url }</a><br />
      { blog.likes } likes <button onClick={ handleLike }>like</button><br />
      added by { blog.author }<br />
      {
        user.username === blog.user.username &&
        <button onClick={ handleRemove }>remove</button>
      }
    </div>
  )
}

export default Blog