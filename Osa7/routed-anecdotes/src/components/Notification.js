import React from 'react'

const Notification = ({ notification, setNotification }) => {

  const renderNotification = () => {
    if (notification !== '') {
      setTimeout(() => {
        console.log('Notification', notification)
        return (
          <h2>{notification}</h2>
        )
      }, 5000)
      setNotification('')
      console.log('Notification', notification)
      return (
        <h2>{notification}</h2>
      )
    }
  }
  return (
    <div>
      <h2>{renderNotification}</h2>
    </div>
  )
}

export default Notification