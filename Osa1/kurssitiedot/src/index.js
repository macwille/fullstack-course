import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props)
    return (
        <>
        <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    console.log(props)
    const [eka, toka , kolmas] = props.parts
    return (
        <>
        <Part name = {eka.name} ex = {eka.exercises}/>
        <Part name = {toka.name} ex = {toka.exercises}/>
        <Part name = {kolmas.name} ex = {kolmas.exercises}/>
        </>
    )
}

const Total = (props) => {
    console.log(props)
    let sum = 0
    props.parts.forEach(element => {
        sum += element.exercises
    });

    return (
    <>
    <p>yhteensä {sum} tehtävää</p>
    </>
    )
}
const Part = (props) => {
    console.log(props)
    return (
        <>
        <p>{props.name} {props.ex}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
        {
        name: 'Reactin perusteet',
        exercises: 10
    },
    {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    },
    {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]  
    return (
        <div>
            <Header course = {course}/>
            <Content parts = {parts}/>
            <Total parts = {parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
