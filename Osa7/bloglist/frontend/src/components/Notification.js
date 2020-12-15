import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../reducers/notificationReducer'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
    }
  }, [message, dispatch])

  if (message === null) {
    return (
      <div>
      </div>
    )
  }

  return (

    <Alert variant="dark">
      <Alert.Heading>
        {message}
      </Alert.Heading>
    </Alert >
  )
}

export default Notification