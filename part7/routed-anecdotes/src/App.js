import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './Components/Menu'
import CreateNew from './Components/CreateNew'
import Footer from './Components/Footer'
import AnecdoteList from './Components/AnecdoteList'
import Anecdote from './Components/Anecdote'
import About from './Components/About'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    console.log('anecdote add new', anecdote)
    anecdote.id = Math.round(Math.random() * 10000)
    let newAnecdote = {
      author: anecdote.author.value,
      content: anecdote.content.value,
      info: anecdote.info.value,
      id: anecdote.id,
      votes: anecdote.votes,
    }
    setAnecdotes(anecdotes.concat(newAnecdote))
    setNotification(` a new anecdote ${newAnecdote.content} create`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <h3>{notification}</h3>
        <Routes>
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdotes={anecdotes} vote={vote} />}
          />

          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  )
}

export default App
