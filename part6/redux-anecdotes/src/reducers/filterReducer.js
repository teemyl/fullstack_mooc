const reducer = (state='', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.content
    default:
      return state
  }
}

export const updateFilter = content => {
  return {
    type: 'UPDATE_FILTER',
    content
  }
}

export default reducer