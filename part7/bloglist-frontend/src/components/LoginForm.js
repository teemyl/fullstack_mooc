import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <Row>
      <Col xs={ 4 } />
      <Col xs={ 4 }>
        <h2 className='display-3'>Log in</h2>
        <form onSubmit={ handleLogin }>
          <div className='form-group'>
            <label for='usenameInput'>Username</label>
            <input
              id='usernameInput'
              type='text'
              value={ username }
              name="Username"
              onChange={ ({ target }) => setUsername(target.value) }
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label for='passwordInput'>Password</label>
            <input
              id='passwordInput'
              type='text'
              value={ password }
              name="Username"
              onChange={ ({ target }) => setPassword(target.value) }
              className='form-control'
            />
          </div>
          <button id='loginButton' type='submit' className='btn btn-primary'>Login</button>
        </form>
      </Col>
      <Col xs={ 4 } />
    </Row>
  )
}

export default LoginForm