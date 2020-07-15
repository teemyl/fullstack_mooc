const initialNotification = {
  message: 'Application initialized'
}

const reducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      return action.message
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

export default reducer