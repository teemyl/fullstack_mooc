import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const alertStyles = {
    'error': 'danger',
    'success': 'success',
    'info': 'info'
  }

  const mapTypeToStyle = () => {
    return alertStyles[notification.type]
  }

  if (!notification.message) {
    return null
  }

  return (
    <Alert variant={ mapTypeToStyle() }>
      { notification.message }
    </Alert>
  )
}

export default Notification