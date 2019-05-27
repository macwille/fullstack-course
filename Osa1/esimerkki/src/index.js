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
const Display = ({counter}) =>  <div> {counter} </div>   

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>
    {text}
    </button>
)

const App2 = (props) => {
    const [ counter, setCounter ] = useState(0)

    const setToValue = (value) => () => {setCounter(value)}
    return (
        <div>
            <Display counter = {counter}/>
            <Button 
            handleClick = {setToValue(counter+1)}
            text ='plus'
            />
            <Button
            handleClick = {setToValue(counter -1)}
            text = 'minus'
            />
            <Button
            handleClick = {setToValue(0) }
            text = 'zero'
            />

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

