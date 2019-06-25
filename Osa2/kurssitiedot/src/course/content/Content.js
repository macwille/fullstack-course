import React from 'react'
import Part from './Part';

const Total = ({ parts }) => {
    console.log(parts)

}

const Content = ({ parts }) => {
    console.log('Content called: ', parts)

    const rows = () => parts.map((part, i) =>
        <li key={i}>
            <Part name={parts[i].name}
                ex={parts[i].exercises}
            />
        </li>
    )

    return (
        <div>
            <ul>
                {rows()}
                <br></br>
                Yhteensä 0 tehtävää
           </ul>
        </div>
    )

}

export default Content