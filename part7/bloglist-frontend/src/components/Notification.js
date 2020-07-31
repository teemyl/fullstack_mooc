import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const errorStyle = {
    color: 'red',
    background: 'lightpink',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    position: 'fixed',
    top: 0,
    width: '100%'
  }

  const successStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    position: 'fixed',
    top: 0,
    right: 0
  }

  if (!notification.message) {
    return null
  }

  return (
    <div
      className={ notification.type }
      style={ notification.type === 'error' ? errorStyle : successStyle }
    >
      { notification.message }
    </div>
  )
}

export default Notification