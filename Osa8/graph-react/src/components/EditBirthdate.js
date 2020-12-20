import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHDAY } from '../queries'

const EditBirthdate = () => {
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

  return (
    <div>
      <h4>Edit Birthyear</h4>
      <form onSubmit={updateBirthdate}>
        <p>
          Name: <input value={name}
            onChange={({ target }) => setName(target.value)} required />
        </p>
        <p>
          Birth Year: <input value={bornString} type='number'
            onChange={({ target }) => setBorn(target.value)} required />
        </p>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default EditBirthdate