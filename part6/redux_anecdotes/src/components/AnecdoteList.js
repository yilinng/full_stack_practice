import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  console.log('anecdotes', anecdotes.anecdote)

  const handleClick = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    //dispatch(clickBtn(anecdote.content))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }
  return (
    <div>
      {anecdotes.anecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
