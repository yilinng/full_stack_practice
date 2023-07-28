import { useAnecdoteValue } from '../AnecdoteContext'

const Notification = () => {
  const anecdote = useAnecdoteValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={style}>{anecdote}</div>
}

export default Notification
