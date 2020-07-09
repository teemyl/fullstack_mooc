import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
    }
    catch (exception) {
      
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
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
    }
    catch (exception) {

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
      <h2>blogs</h2>
      <div>{ user.name } logged in</div>
      <button onClick={ handleLogout }>logout</button>
      <h2>create new</h2>
      { blogForm() }
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } />) }
    </div>
  )

  return (
    <div>
      { user === null ? loginForm() : showBlogs() }
    </div>
  )
}

export default App