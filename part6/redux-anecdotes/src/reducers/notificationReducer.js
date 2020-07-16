
const emptyMessage = { message: '', timeoutId: null }

const reducer = (state = emptyMessage, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return emptyMessage
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    const old = getState().notification
    
    if (old.timeoutId)
      clearTimeout(old.timeoutId)

    const timeoutId = setTimeout(() => dispatch(clearNotification()), timeout * 1000)

    dispatch({
      type: 'NEW_MESSAGE',
      data: {
        message,
        timeoutId 
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default reducer