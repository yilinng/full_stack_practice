import React, { useState } from 'react'
import { useMutation } from 'react-query'
import PropTypes from 'prop-types'
import userService from '../services/users'
import '../index.css'

const Signup = ({ dispatch }) => {
  const [username, setUserName] = useState('')
  const [name, setName] = useState('')

  const [password, setPassword] = useState('')

  const signupMutation = useMutation(userService.signUp, {
    onSuccess: (data) => {
      console.log(data)
      //const users = queryClient.getQueryData('users')
      //queryClient.setQueryData('users', users.concat(newUser))
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: `${data.username} sign up success!! please login.`,
      })

      setUserName('')
      setName('')
      setPassword('')

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 1000)
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
      name,
      password,
    }

    signupMutation.mutate(pass_user)
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
      <div className="form-name">
        <label htmlFor="name"> name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
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
      <div className="form-button">
        <input type="submit" value="login" id="login-button" />
      </div>
    </form>
  )
}

Signup.prototype = {
  dispatch: PropTypes.func.isRequired,
}

export default Signup
