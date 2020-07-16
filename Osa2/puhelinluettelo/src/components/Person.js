import React from 'react'

const Person = ({ name, number, deletePerson }) => {

    return (

        <h3>{name} {number}<button onClick={deletePerson}> Delete</button></h3>
    )

}

export default Person