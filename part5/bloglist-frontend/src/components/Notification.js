import React from 'react'

const Notification = ({ message, type }) => {

  const errorStyle = {
    color: 'red',
    background: 'lightpink',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const successStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message) {
    return null
  }

  return (
    <div style={ type === "error" ? errorStyle : successStyle }>
      { message }
    </div>
  )
}

export default Notification