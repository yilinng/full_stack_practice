import { useState, useEffect } from 'react'
import countryService from '../services/countries'

export const useCountry = (type) => {
  const [value, setValue] = useState('')
  const [courtries, setCourtries] = useState([])
  const [filterByName, setFilterByName] = useState([])

  const handleFilter = (valueFromOnchange) => {
    const filterByName = courtries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(valueFromOnchange.toLowerCase())
    )
    setFilterByName(filterByName)
  }

  const onChange = (event) => {
    setValue(event.target.value)
    handleFilter(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('onSubmit', event)
  }

  const getData = () => {
    countryService.getAll().then((initialPersons) => {
      setCourtries(initialPersons)
      setFilterByName(initialPersons)
    })
  }

  useEffect(() => getData(), [])

  return {
    type,
    value,
    onChange,
    courtries,
    filterByName,
    onSubmit,
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
