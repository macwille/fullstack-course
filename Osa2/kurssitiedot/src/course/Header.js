import React from 'react'

const Header = ({ name }) => {
    console.log('Header called: ', name)
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

export default Header