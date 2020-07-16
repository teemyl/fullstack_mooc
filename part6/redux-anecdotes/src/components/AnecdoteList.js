import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { incrementVotesOf, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const _initializeAnecdotes = props.initializeAnecdotes
  const _setNotification = props.setNotification
  const _incrementVotesOf = props.incrementVotesOf

  useEffect(() => {
    _initializeAnecdotes()
    _setNotification('Application initialized', 5)
  }, [_initializeAnecdotes, _setNotification])
  
  const vote = anecdote => {
    _incrementVotesOf(anecdote)
    _setNotification(`you voted '${ anecdote.content }'`, 5)
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

const mapDispatchToProps = {
  incrementVotesOf,
  initializeAnecdotes,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)