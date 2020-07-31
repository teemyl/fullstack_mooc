const initialState = { message: '', type: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return initialState
    default:
      return state
  }
}

let timeoutId = null

export const setMessage = (message, type, timeout = 3) => {
  return async dispatch => {
    if (timeoutId)
      clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => dispatch(clearMessage()), timeout * 1000)

    dispatch({
      type: 'NEW_MESSAGE',
      data: {
        message,
        type,
      }
    })
  }
}

const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default reducer