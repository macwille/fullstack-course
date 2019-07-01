import React from 'react'
import Part from './Part'


const Content = (props) => {
    console.log('Content called: ', props)

    const {parts} = props

    var initialValue = 0;

    const sum = parts.reduce(
        (acc, cur) => acc + cur.exercises, initialValue);


   return (
       <div>
       <ul>
           {parts.map(part => <li key = {part.id}><Part name = {part.name} ex = {part.exercises}></Part></li>)}

       </ul>
       <p>total of {sum} exercises</p>

       
       </div>
   )
}
export default Content