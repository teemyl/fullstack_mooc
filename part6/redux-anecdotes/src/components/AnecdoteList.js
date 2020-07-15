import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const vote = anecdote => {
    console.log('vote', anecdote.id)
    dispatch(incrementVotesOf(anecdote.id))
    dispatch(updateNotification(`you voted '${ anecdote.content }'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {
        anecdotes
          .filter(a =>
            a.content.toUpperCase().includes(filter.toUpperCase())
          )
          .map(anecdote =>
            <div key={ anecdote.id }>
              <div>
                { anecdote.content }
              </div>
              <div>
                has { anecdote.votes }
                <button onClick={ () => vote(anecdote) }>vote</button>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default AnecdoteList