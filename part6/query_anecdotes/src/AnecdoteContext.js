import { createContext, useReducer, useContext } from 'react'

const anecdoteReducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      return `anecdote '${action.content}' voted`
    }
    case 'ERROR': {
      return action.error
    }

    default:
      return ''
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [anecdote, counterDispatch] = useReducer(anecdoteReducer, '')

  return (
    <AnecdoteContext.Provider value={[anecdote, counterDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdoteValue = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export default AnecdoteContext
