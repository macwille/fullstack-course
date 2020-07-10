import React from 'react'

const Part = (props) => {
    console.log('Part called:', props)
    return (
        <>
            <p>{props.name}, {props.ex} points.</p>
        </>
    )
}

export default Part