import React from 'react'
import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { incrementVotesOf, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
    dispatch(setNotification('Application initialized', 3))
  }, [dispatch])
  
  const vote = anecdote => {
    dispatch(incrementVotesOf(anecdote))
    dispatch(setNotification(`you voted '${ anecdote.content }'`, 3))
  }

  return (
    <div>
      {
        props.anecdotes
          .filter(a =>
            a.content.toUpperCase().includes(props.filter.toUpperCase())
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(AnecdoteList)