const initialState = {
  message: '',
  error: '',
  user: '',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS': {
      console.log('initialState', initialState)
      console.log('action', action)
      state.message = action.payload
      return state
    }
    case 'ERROR': {
      console.log('initialState', initialState)
      console.log('action', action)
      state.error = action.payload
      return state
    }
    case 'CLEAR': {
      console.log('initialState', initialState)
      console.log('action', action)
      state.message = ''
      state.error = ''
      return state
    }
    case 'LOGIN_SUCCESS': {
      console.log('initialState', initialState)
      console.log('action', action)
      state.user = action.payload
      return state
    }
    case 'LOGOUT_SUCCESS': {
      console.log('initialState', initialState)
      console.log('action', action)
      const filteredUser = state.users.filter(
        (user) => user.token !== action.payload
      )

      state.users = filteredUser
      return state
    }
    default:
      return state
  }
}

export default notificationReducer
