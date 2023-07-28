import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (anecdote) => {
      console.log(anecdote.response.data, anecdote.response.data.error)
      dispatch({
        type: 'ERROR',
        error: anecdote.response.data.error,
      })
      setTimeout(() => {
        dispatch({ type: 'clear' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    const getId = () => (100000 * Math.random()).toFixed(0)

    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
