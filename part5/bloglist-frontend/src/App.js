import React, { useState, useEffect, useRef } from 'react'

// Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

// Import services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // References
  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
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
  }

  const updateBlog = async (blog) => {
    try {
      // Format the user field to only include the id
      const updatedBlog = await blogService.update({
        ...blog,
        user: blog.user.id
      })

      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))

      setSuccessMessage(`Updated ${ updatedBlog.title } by ${ updatedBlog.author }`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }
    catch (exception) {
      setErrorMessage(`Couldn't update blog: ${ exception.message }`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      const result = window.confirm(`Remove ${ blog.title } ny ${ blog.author }?`)
      if (result) {
        await blogService.remove(blog)

        setBlogs(blogs.filter(b => b.id !== blog.id))

        setSuccessMessage('Blog removed successfully')
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      }

    }
    catch (exception) {
      setErrorMessage(`Couldn't remove blog: ${ exception.message }`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
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
              blog={ blog }
              updateBlog={ updateBlog }
              removeBlog={ removeBlog } />
          )
      }
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