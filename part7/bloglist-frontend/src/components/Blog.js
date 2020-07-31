import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  if (!blog)
    return <Redirect to='/' />

  const handleLike = () => {    
    dispatch(
      updateBlog({ ...blog, likes: blog.likes + 1 })
    )
  }

  return (
    <div>
      <h1>{ blog.title }</h1>
      <a href={ blog.url }>{ blog.url }</a><br />
      { blog.likes } likes <button onClick={ handleLike }>like</button><br />
      added by { blog.author }
    </div>
  )
}

export default Blog