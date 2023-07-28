import { createSlice } from '@reduxjs/toolkit'

const initialState = 'click button!!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clickBtn(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return `you voted '${action.payload}'`
    },
    clearNotification(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return 'clear ...'
    },
  },
})

export const { clickBtn, clearNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(clickBtn(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
