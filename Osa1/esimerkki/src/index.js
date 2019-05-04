import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    console.log('Hello component called')
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
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

ReactDOM.render(<App />, document.getElementById('root'));

