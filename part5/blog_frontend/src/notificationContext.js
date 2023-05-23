import { createContext, useReducer } from 'react'

let initialState = {
  message: '',
  error: '',
  user: '',
}

const notificationReducer = (state = initialState, action) => {
  console.log('state', state)
  console.log('action', action)
  console.log('initialState', initialState)
  switch (action.type) {
    case 'SUCCESS': {
      initialState.message = action.payload

      return initialState
    }
    case 'ERROR': {
      initialState.error = action.payload

      return initialState
    }
    case 'CLEAR': {
      initialState.error = ''
      initialState.message = ''

      return initialState
    }
    case 'LOGIN_SUCCESS': {
      initialState.user = action.payload
      return initialState
    }
    case 'LOGOUT_SUCCESS': {
      initialState.user = ''

      return initialState
    }
    case 'TOKEN_SUCCESS': {
      initialState.user = action.payload
      return initialState
    }
    default:
      return initialState
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
