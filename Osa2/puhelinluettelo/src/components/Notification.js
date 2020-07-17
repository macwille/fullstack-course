import React from 'react'

const Notification = ({ message, error }) => {

    console.log('Notification called, Error:', error)
    if (message === null) {
        return null
    }
    if (error) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }
    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notification