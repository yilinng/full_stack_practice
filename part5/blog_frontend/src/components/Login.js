import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleSubmit, setUserName, setPassword }) => {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className='form-username'>
        <label htmlFor='username'>username: </label>
        <input
          type='text'
          name='username'
          id='username'
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className='form-password'>
        <label htmlFor='password'>password: </label>
        <input
          type='password'
          name='password'
          id='password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='form-example'>
        <input type='submit' value='login' id='login-button' />
      </div>
    </form>
  )
}

Login.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default Login
