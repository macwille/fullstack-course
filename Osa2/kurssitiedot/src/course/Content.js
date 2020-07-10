import React from 'react'
import Part from './Part'


const Content = (props) => {
    console.log('Content called: ', props)

    const { parts } = props

    var initialValue = 0;

    const total = parts.reduce(
        (acc, cur) => acc + cur.exercises, initialValue);


    return (
        <div>
            <ul>
                {parts.map(part => <li key={part.id}><Part name={part.name} ex={part.exercises}></Part></li>)}

            </ul>
            <h3>total of {total} exercises.</h3>


        </div>
    )
}
export default Content