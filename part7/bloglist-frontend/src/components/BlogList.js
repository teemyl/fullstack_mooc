import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
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
      <h2 className='display-3'>Blogs</h2>
      <Toggleable
        buttonClassName='blogForm'
        buttonLabel='Add blog'
        ref={ blogFormRef }>
        <BlogForm createBlog={ addBlog } />
      </Toggleable>
      <br />
      <Table striped bordered size='sm'>
        <thead className='thead-dark'>
          <tr>
            <th>
              Blog title
            </th>
            <th>
              Author
            </th>
          </tr>
        </thead>
        <tbody>
          {
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <tr key={ blog.id }>
                  <td>
                    <Link to={`/blogs/${ blog.id }`}>{ blog.title }</Link>
                  </td>
                  <td>
                    { blog.author }
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList