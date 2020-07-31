import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navigation = ({ user }) => {

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  const navBarStyle = {
    backgroundColor: 'rgb(0, 0, 0, 0.3)'
  }

  const navLinkStyle = {
    padding: 5
  }

  return (
    <div style={ navBarStyle }>
      <Link style={ navLinkStyle } to='/'>home</Link>
      <Link style={ navLinkStyle } to='/users'>users</Link>
      { user.name } logged in &nbsp;
      <button onClick={ handleLogout }>logout</button>
    </div>
  )
}

export default Navigation