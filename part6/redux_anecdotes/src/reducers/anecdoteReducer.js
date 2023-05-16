import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}
*/
//const initialState = anecdotesAtStart.map(asObject)

const noteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      state.map((text) => {
        if (text.id === action.payload.id) {
          text.votes = text.votes + 1
          return text
        }
        return text
      })
    },
    filterChange(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return state.filter((text) =>
        text.content.toLowerCase().includes(action.payload.toLowerCase())
      )
    },

    appendAnecdote(state, action) {
      console.log(action, 'appendAnecdote')

      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      console.log(action, 'setAnecdotes')
      return action.payload
    },
  },
})

export const {
  toggleImportanceOf,
  filterChange,
  appendAnecdote,
  setAnecdotes,
} = noteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    console.log('anecdotes', anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.updateItem(anecdote)
    console.log('newAnecdote', newAnecdote)

    dispatch(toggleImportanceOf(newAnecdote))
  }
}

export const filterAnecdote = (content) => {
  return async (dispatch) => {
    if (content) {
      return dispatch(filterChange(content))
    }
    dispatch(initializeAnecdotes())
  }
}

export default noteSlice.reducer

/*
//https://redux.js.org/usage/troubleshooting
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === 'VOTE') {
    return initialState.map((text) => {
      if (text.id === action.payload.id) {
        text.votes = text.votes + 1
        //return text
      }
      return text
    })
  }

  if (action.type === 'SET_FILTER') {
    return initialState.filter((text) =>
      text.content.toLowerCase().includes(action.payload.toLowerCase())
    )
  }
  return initialState
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'VOTE',
    payload: { id },
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default reducer
*/
