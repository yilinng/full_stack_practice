import { Link, useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes, vote }) => {
  console.log('anecdotes', anecdotes)
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <h3>has {anecdote.votes} votes</h3>
      <h3>
        for more see <Link to={anecdote.info}>{anecdote.info}</Link>
      </h3>
      <button onClick={() => vote(Number(id))}>vote</button>
    </div>
  )
}

export default Anecdote
