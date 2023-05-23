import React, { useState } from 'react'
import { useMutation } from 'react-query'
import PropTypes from 'prop-types'
import userService from '../services/users'

const Login = ({ dispatch }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation(userService.logIn, {
    onSuccess: (data) => {
      console.log(data)
      //const users = queryClient.getQueryData('users')
      //queryClient.setQueryData('users', users.concat(newUser))
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      })
      // console.log('from login success', data)
      localStorage.setItem('token', data.token)
      setUserName('')
      setPassword('')
    },
    onError: (error) => {
      // console.log('error', error)
      dispatch({
        type: 'ERROR',
        payload: error.response.data.error,
      })

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 1000)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const pass_user = {
      username,
      password,
    }

    loginMutation.mutate(pass_user)
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-username">
        <label htmlFor="username">username: </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-password">
        <label htmlFor="password">password: </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-example">
        <input type="submit" value="login" id="login-button" />
      </div>
    </form>
  )
}

Login.prototype = {
  dispatch: PropTypes.func.isRequired,
}

export default Login
