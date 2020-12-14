import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log('change to:', event.target.value)
    setValue(event.target.value)
  }
  const reset = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}