import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import BlogListItem from './BlogListItem'
import { createBlog } from '../reducers/blogReducer'

const BlogList = ({ blogs }) => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  if (!user)
    return <Redirect to='/login' />

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <Toggleable
        buttonClassName='blogForm'
        buttonLabel='add blog'
        ref={ blogFormRef }>
        <BlogForm createBlog={ addBlog } />
      </Toggleable>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <BlogListItem
              key={ blog.id }
              user={ user }
              blog={ blog } />
          )
      }
    </div>
  )
}

export default BlogList