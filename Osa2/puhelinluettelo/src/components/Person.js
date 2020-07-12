import React, { Component } from 'react'

const Person = (props) => {
    console.log('Person: ', props)

    return (

        <h3>{props.name}, {props.number}</h3>
    )

}

export default Person