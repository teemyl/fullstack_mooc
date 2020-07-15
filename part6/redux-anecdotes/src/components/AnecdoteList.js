import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotesOf, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }, [dispatch])
  
  const vote = anecdote => {
    dispatch(incrementVotesOf(anecdote))
    dispatch(setNotification(`you voted '${ anecdote.content }'`, 3))
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