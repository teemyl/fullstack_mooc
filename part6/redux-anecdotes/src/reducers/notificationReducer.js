const initialNotification = 'Application initialized'

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export const updateNotification = message => {
  return { 
    type: 'NEW_MESSAGE',
    message: message
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default reducer