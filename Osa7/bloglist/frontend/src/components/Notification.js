import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../reducers/notificationReducer'

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

  return (
    <div>
      <h4>{message}</h4>
    </div >
  )
}

export default Notification