import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  let newState = []

  switch (action.type) {
    case 'INCREMENT_VOTE':
      newState = state.map(a => a.id === action.id ? { ...a, votes: action.votes } : a)
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

export const incrementVotesOf = anecdote => {
  return async dispatch => {
    const newObject = {...anecdote, votes: anecdote.votes += 1 }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, newObject)
    dispatch({
      type: 'INCREMENT_VOTE',
      id: updatedAnecdote.id,
      votes: updatedAnecdote.votes
    })
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