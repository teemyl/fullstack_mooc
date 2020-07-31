import loginService from '../services/login'
import blogService from '../services/blogs'

import { setMessage } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
      
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        blogService.setToken(user.token)
        return user
      }

      return state
  }
}

export const getUser = () => {
  
}

export const login = ( username, password ) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      dispatch({
        type: 'USER_LOGIN',
        data: user
      })

      blogService.setToken(user.token)

      dispatch(setMessage(`Logged in successfully as ${ user.name }`, 'success'))
    }
    catch (exception) {
      dispatch(setMessage('Invalid username or password', 'error'))
    }
  }
}

export const logout = () => {
  window.localStorage.clear()
  return {
    type: 'USER_LOGOUT'
  }
}

export default reducer