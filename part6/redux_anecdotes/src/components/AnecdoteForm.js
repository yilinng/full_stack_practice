import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  )
}
