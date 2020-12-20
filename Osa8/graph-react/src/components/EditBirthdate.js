import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_BIRTHDAY } from '../queries'

const EditBirthdate = ({ authors }) => {
  const [name, setName] = useState('')
  const [bornString, setBorn] = useState('')

  const [editBirthday] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
  })

  const updateBirthdate = async (event) => {
    event.preventDefault()
    console.log('Submit:', name, bornString)
    editBirthday({ variables: { name, born: Number(parseInt(bornString)) } })

    setName('')
    setBorn('')

  }

  const handleNameSelect = (event) => {
    setBorn (authors.find(a => a.name === event.value).born)
    setName(event.value)
  }

  const getAuthorBirthyear = '1000'

  const options = authors.map(a => {
    return (
      {
        value: a.name,
        label: a.name
      }
    )
  })

  return (
    <div>
      <h4>Edit the birthyear of {name}</h4>
      <form onSubmit={updateBirthdate}>
        <Select
          value={options.find(item => item.value === name)}
          options={options}
          onChange={handleNameSelect}
        />
        <p>
          Birth Year:
          <input
            placeholder={getAuthorBirthyear}
            value={bornString}
            type='number'
            onChange={({ target }) => setBorn(target.value)} required
          />
        </p>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default EditBirthdate