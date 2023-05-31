import { useState, useEffect } from 'react'
import { FILTER_Book } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = ({ show, books }) => {
  console.log('books', books)
  const [clickGenres, setClickGenres] = useState([])
  //https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually
  const [getBook, { loading, error, data }] = useLazyQuery(FILTER_Book)

  let genresSet = new Set()

  books.map((book) => book.genres.map((item) => genresSet.add(item)))

  useEffect(() => {
    if (clickGenres.length) {
      console.log('clickGenres', clickGenres)
      getBook({ variables: { genres: clickGenres } })
    } else {
      getBook()
    }
  }, [clickGenres, clickGenres.length, getBook])

  if (loading) return <p>Loading ...</p>
  if (error) return `Error! ${error}`

  console.log('book data', data)

  if (!show) {
    return null
  }

  const handleClick = (item) => {
    console.log('handleClick')
    if (!clickGenres.includes(item)) {
      setClickGenres([...clickGenres, item])
    }
  }

  return (
    <div>
      <h2>books</h2>

      <div className='click_list'>
        in genre
        {clickGenres.map((genre, index) => (
          <span key={index}>
            <b> {genre}</b>
          </span>
        ))}
      </div>

      <table>
        <tbody>
          {data && data.allBooks.length > 0 ? (
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
          ) : (
            <tr>
              <th>no book matched ...</th>
            </tr>
          )}

          {clickGenres.length && data
            ? data.allBooks.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td>{item.author.name}</td>
                  <td>{item.published}</td>
                </tr>
              ))
            : books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {[...genresSet].map((item, index) => (
        <button type='button' key={index} onClick={() => handleClick(item)}>
          {item}
        </button>
      ))}
      <button onClick={() => setClickGenres([])}>clear</button>
    </div>
  )
}

export default Books
