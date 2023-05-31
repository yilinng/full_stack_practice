import { useState } from 'react'
import { UPDATE_AUTHOR, ALL_Authors } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = ({ show, authors, setError }) => {
  console.log('authors', authors)

  const token = localStorage.getItem('phonenumbers-user-token')
  console.log('token', token)

  const options = authors.map((author) => {
    let value = author.name
    let label = author.name
    let final = {
      value,
      label,
    }
    return final
  })

  console.log('options', options)

  const [selectedName, setSelectedName] = useState(null)
  const [setBornTo, setSetBornTo] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_Authors }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  if (!show) {
    return null
  }

  const handleSubmit = async (event) => {
    console.log('handle submit....', selectedName, setBornTo)
    event.preventDefault()

    await updateAuthor({
      variables: { name: selectedName.value, setBornTo: Number(setBornTo) },
    })

    setSelectedName(null)
    setSetBornTo('')

    console.log('authors', authors)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmitCapture={handleSubmit}>
            <div className='div_name'>
              <label htmlFor='name'>name: </label>
              <Select
                defaultValue={selectedName}
                onChange={setSelectedName}
                options={options}
              />
            </div>
            <div className='div_born'>
              <label htmlFor='setBornTo'>born:</label>
              <input
                type='text'
                onChange={(e) => setSetBornTo(e.target.value)}
                value={setBornTo}
              />
            </div>
            <div className='input_btn'>
              <input type='submit' value='update author' />
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
