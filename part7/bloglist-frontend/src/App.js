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
import Navigation from './components/Navigation'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'

import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
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

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null
  
  if (!user) {
    return (
      <div className='container justify-content-center'>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      { 
        user && 
        <Navigation user={ user } />
      }
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User user={ matchedUser } />
        </Route>
        <Route path='/users'>
          <UserList />
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