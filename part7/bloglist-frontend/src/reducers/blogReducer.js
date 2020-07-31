import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data ? action.data : state
    case 'NEW_BLOG':
      return state.concat(action.data)
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

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
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

export default reducer