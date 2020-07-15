const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  let newState = []

  switch (action.type) {
    case 'INCREMENT_VOTE':
      newState = state.map(a => a.id === action.id ? { ...a, votes: a.votes += 1 } : a)
      break
    case 'NEW_ANECDOTE':
      newState = [...state, action.data]
      break
    case 'INIT_ANECDOTES':
      newState = action.data
      break
    default:
      newState = [...state]
  }

  return newState.sort((a, b) => b.votes - a.votes)
}

export const incrementVotesOf = id => {
  return {
    type: 'INCREMENT_VOTE',
    id: id
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer