import { useState } from 'react'
//import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Countries from './components/Countries'
//import countryService from './services/countries'
import './index.css'
import { useCountry } from './hooks/index'

//https://www.reddit.com/r/reactjs/comments/up13ei/custom_hook_not_updating_in_component/
const App = () => {
  const { type, value, onChange, filterByName, courtries } = useCountry('text')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message ? (
        <h3 className='message'>{message}</h3>
      ) : error ? (
        <h3 className='error'>{error}</h3>
      ) : (
        <h3 className='no_message'>''</h3>
      )}

      <div>
        filter shown with:
        <input type={type} value={value} onChange={onChange} />
      </div>

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Countries filterByName={filterByName} countries={courtries} />
    </div>
  )
}

export default App
