import React from 'react'

const Notification = ({ message }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div>
      {message !== null &&
        <div style={style}>
          {message}
        </div>

      }
    </div>
  )
}

export default Notification