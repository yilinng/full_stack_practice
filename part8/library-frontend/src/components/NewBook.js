import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_Authors } from '../queries'
//import { updateCache } from '../updateCache'

const NewBook = ({ show, setError, setPage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_Authors }],
    onError: (error) => {
      console.log('error', error)
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
    /*
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_Authors }, ({ allBooks, allAuthors }) => {
        console.log('update add book allBooks', allBooks)
        console.log('update add book response', response)
        return {
          allBooks: allBooks.concat(response.data.addBook),
          allAuthors: allAuthors.concat(response.data.addBook.author),
        }
      })
    },
   
    update: (cache, response) => {
      console.log('new book update response', response)
      updateCache(cache, { query: ALL_Authors }, response.data.addBook)
    },
     */
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    await createBook({
      variables: { title, author, published: Number(published), genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
