import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

// Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import { getBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Redux states
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  // References
  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
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

  const showBlogs = () => (
    <div>
      <div>
        { user.name } logged in
        <button onClick={ handleLogout }>logout</button>
      </div>
      <h2>create new</h2>
      <Toggleable
        buttonClassName='blogForm'
        buttonLabel='add blog'
        ref={ blogFormRef }
      >
        <BlogForm createBlog={ addBlog } />
      </Toggleable>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={ blog.id }
              user={ user }
              blog={ blog } />
          )
      }
    </div>
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
                <td>{ u.name }</td>
                <td>{ u.blogs.length }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <h2>{ user === null ? 'log in' : 'blogs' }</h2>
      <Notification />
      <Router>
        <Switch>
          <Route path='/users'>
            { user === null ? loginForm() : showUsers() }
          </Route>
          <Route path='/'>
            { user === null ? loginForm() : showBlogs() }
          </Route>
        </Switch>
      </Router>
      
    </div>
  )
}

export default App