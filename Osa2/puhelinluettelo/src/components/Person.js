import React from 'react'

const Person = ({ name, number, deletePerson }) => {

    return (
        <li className='person'>{name} {number}<button onClick={deletePerson}> Delete</button></li>
    )
}

export default Person