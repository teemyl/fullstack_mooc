
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({ type: 'NEW_MESSAGE', message })
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default reducer