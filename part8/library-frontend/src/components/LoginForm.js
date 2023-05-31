import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='username_input'>
          <label htmlFor='username'> username: </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='password_input'>
          <label htmlFor='password'> password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='button'>
          <input type='submit' value='submit' />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
