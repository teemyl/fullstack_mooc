import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data ? action.data : state
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(setMessage(`A new blog ${ newBlog.title } by ${ newBlog.author } added`, 'success'))
    }
    catch (exception) {
      dispatch(setMessage(`Couldn't create new blog: ${ exception.message }`, 'error'))
    }
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      // Format the user field to only include the id
      const updatedBlog = await blogService.update({
        ...blog,
        user: blog.user.id
      })

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })

      dispatch(setMessage(`Updated ${ updatedBlog.title } by ${ updatedBlog.author }`, 'success'))
    }
    catch (exception) {
      dispatch(setMessage(`Couldn't update blog: ${ exception.message }`, 'error'))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })

      dispatch(setMessage('Blog removed successfully', 'success'))
    }
    catch (exception) {
      dispatch(setMessage(`Couldn't remove blog: ${ exception.message }`, 'error'))
    }
  }
}

export default reducer