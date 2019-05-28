import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({name, age}) => {
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
        <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born {bornYear()}</p>
        </div>
    )
}

const App = (props) => {
    console.log('Main app')
    const nimi = 'Pekka'
    const ika = 10
    return (
        <>
         <h1>Greetings</h1>
         <Hello name = "Arto" age={26+10}/>
         <Hello name = {nimi} age={ika}/>
        </>

    )
}

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used  by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
    {text}
    </button>
)
const App2 = (props) => {
    const[left, setLeft] = useState(0)
    const[right, setRight] = useState(0)
    const[allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left+1)
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right +1)
    }
    return (
        
        <div>
            
            <div>
                <h1> React App</h1>
                {left}
                <Button handleClick = {handleLeftClick} text = 'left'/>
                <Button handleClick = {handleRightClick} text = 'right'/>
                {right}
                <History allClicks = {allClicks}/>
            </div>
        </div>
    )
}


// App1
// ReactDOM.render(<App />, document.getElementById('root'));

// App2
ReactDOM.render(
    <App2 />,
    document.getElementById('root')
)

