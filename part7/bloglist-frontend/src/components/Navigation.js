import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../reducers/loginReducer'

const Navigation = ({ user }) => {

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect bg='dark' expand='lg' variant='dark' className='justify-content-between'>
      <Navbar.Brand as={ Link } to='/'>Bloglist App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={ Link } to='/'>Home</Nav.Link>
          <Nav.Link as={ Link } to='/users'>Users</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text>{ user.name } logged in</Navbar.Text>&nbsp;
          <Button onClick={ handleLogout } variant='outline-info'>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation