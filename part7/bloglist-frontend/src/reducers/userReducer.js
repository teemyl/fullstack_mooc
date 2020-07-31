import userService from '../services/users'
import { setMessage } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.data
    default:
      return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'GET_ALL_USERS',
        data: users
      })
    }
    catch (e) {
      dispatch(setMessage(`Couldn't fetch users: ${ e.message }`, 'error'))
    }
  }
}

export default reducer