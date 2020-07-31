import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

// Import services
import blogService from './services/blogs'
import loginService from './services/login'

import { setMessage } from './reducers/notificationReducer'
import { getBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Redux states
  const blogs = useSelector(state => state.blogs)

  // References
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const getAll = async () => {
      dispatch(getBlogs())
    }
    getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setMessage(`Logged in successfully as ${ user.name }`, 'success'))
    }
    catch (exception) {
      dispatch(setMessage('Invalid username or password', 'error'))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
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

  return (
    <div>
      <h2>{ user === null ? 'log in' : 'blogs' }</h2>
      <Notification />
      { user === null ? loginForm() : showBlogs() }
    </div>
  )
}

export default App