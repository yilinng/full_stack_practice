import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_Authors, BOOK_ADDED } from './queries'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const result = useQuery(ALL_Authors)
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('BOOK_ADDED', data)
      const addedBook = data.data.bookAdded

      console.log('addedBook', addedBook)

      notify(`${addedBook.title} added`)

      // updateCache(client.cache, { query: ALL_Authors }, addedBook)

      client.cache.updateQuery(
        { query: ALL_Authors },
        ({ allBooks, allAuthors }) => {
          console.log('allBooks', allBooks)
          console.log('allAuthors', allAuthors)
          return {
            allBooks: allBooks.concat(addedBook),
            allAuthors: allAuthors.concat(addedBook.author),
          }
        }
      )
    },
  })

  console.log('result', result)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const getToken = localStorage.getItem('phonenumbers-user-token')
    if (getToken !== null) {
      setToken(getToken)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>

            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        setError={notify}
      />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} setError={notify} setPage={setPage} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
