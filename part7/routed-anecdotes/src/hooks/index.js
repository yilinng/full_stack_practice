import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(event)
    if (event) {
      return setValue(event.target.value)
    }
    return setValue('')
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return {
    type,
    value,
    onChange,
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
