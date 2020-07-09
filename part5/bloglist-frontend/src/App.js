import React, { useState, useEffect } from 'react'

// Import components
import Blog from './components/Blog'
import Notification from './components/Notification'

// Import services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  // Blog states
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [blogs, setBlogs] = useState([])

  // Other
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const getAll = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    getAll()
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
      setSuccessMessage(`Logged in successfully as ${ user.name }`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }
    catch (exception) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })

      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`A new blog ${ newBlog.title } by ${ newBlog.author } added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }
    catch (exception) {
      setErrorMessage(`Couldn't create new blog: ${ exception.message }`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
    finally {
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
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
          type='text'
          value={ username }
          name="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        password
        <input
          type='text'
          value={ password }
          name="Username"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <form onSubmit={ addBlog }>
        title:
        <input
          type='text'
          value={ blogTitle }
          name='title'
          onChange={ ({ target }) => setBlogTitle(target.value) }
        /><br />
        author:
        <input
          type='text'
          value={ blogAuthor }
          name='author'
          onChange={ ({ target }) => setBlogAuthor(target.value) }
        /><br />
        url:
        <input
          type='text'
          value={ blogUrl }
          name='url'
          onChange={ ({ target }) => setBlogUrl(target.value) }
        /><br />
        <button type='submit'>create</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <div>
        { user.name } logged in
        <button onClick={ handleLogout }>logout</button>
      </div>
      <h2>create new</h2>
      { blogForm() }
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } />) }
    </div>
  )

  return (
    <div>
      <h2>{ user === null ? 'log in' : 'blogs' }</h2>
      <Notification message={ errorMessage } type={ 'error' } />
      <Notification message={ successMessage } type={ 'success' } />
      { user === null ? loginForm() : showBlogs() }
    </div>
  )
}

export default App