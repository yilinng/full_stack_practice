import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import userService from '../services/users'
import '../index.css'

const Navbar = ({ notification, handleLogout, dispatch }) => {
  const padding = {
    padding: 5,
  }

  const token = localStorage.getItem('token')
  //const getUserDataWithToken = useQuery('users', userService.getUserWithToken)

  console.log('notification', notification)

  const getTokenMutation = useMutation(userService.getUserWithToken, {
    onSuccess: (data) => {
      console.log(data)

      dispatch({
        type: 'TOKEN_SUCCESS',
        payload: data,
      })
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

  useEffect(() => {
    if (token) {
      getTokenMutation.mutate()
    }
  }, [dispatch])

  if (notification && 'user' in notification && notification.user) {
    return (
      <div className="navbar">
        <div className="link">
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>
        <div className="navbar_log">
          <h3>{notification.user.username} logged in</h3>

          <button onClick={handleLogout}> logout </button>
        </div>
      </div>
    )
  }
}

Navbar.prototype = {
  notification: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Navbar
