import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'
import CommentForm from './CommentForm'
import { createComment } from '../reducers/blogReducer'

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

  const addComment = async (commentObject) => {
    dispatch(createComment(blog, commentObject))
  }

  const showComments = () => (
    <ul>
      {
        blog.comments.map((comment, i) => <li key={ i }>{ comment }</li> )
      }
    </ul>
  )

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
      <h2>comments</h2>
      <CommentForm createComment={ addComment } />
      { blog.comments.length > 0 ? showComments() : "No comments yet"}
    </div>
  )
}

export default Blog