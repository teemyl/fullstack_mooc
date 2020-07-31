import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useRouteMatch, 
  Redirect
} from 'react-router-dom'

// Import components
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import User from './components/User'
import Blog from './components/Blog'

import { getBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)


  const dispatch = useDispatch()

  useEffect(() => {
    const getAll = async () => {
      dispatch(getBlogs())
      dispatch(getUsers())
    }
    getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login(username, password))

    setUsername('')
    setPassword('')
  }

  const handleLogout = async () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          id='usernameInput'
          type='text'
          value={ username }
          name="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        password
        <input
          id='passwordInput'
          type='text'
          value={ password }
          name="Username"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button id='loginButton' type='submit'>login</button>
    </form>
  )

  const showUsers = () => (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td><b>name</b></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {
            users.map(u => (
              <tr key={ u.id }>
                <td><Link to={ `/users/${ u.id }` }>{ u.name }</Link></td>
                <td>{ u.blogs.length }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

  const showLoginStatus = () => (
    <div>
      { user.name } logged in &nbsp;
      <button onClick={ handleLogout }>logout</button>
    </div>
  )

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <div>
      <h2>{ user === null ? 'log in' : 'blogs' }</h2>
      { user && showLoginStatus() }
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          { user ? <User user={ matchedUser } /> : loginForm() }
        </Route>
        <Route path='/users'>
          { user ? showUsers() : loginForm() }
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={ matchedBlog } user={ user } />
        </Route>
        <Route path='/blogs'>
          <BlogList blogs={ blogs } /> 
        </Route>
        <Route path='/'>
          <Redirect to='/blogs' />
        </Route>
      </Switch>
    </div>
  )
}

export default App