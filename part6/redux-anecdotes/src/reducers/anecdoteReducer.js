import anecdoteService from '../services/anecdotes'

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

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer