import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
        <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
        <Part name = {props.part1} ex = {props.ex1}/>
        <Part name = {props.part2} ex = {props.ex2}/>
        <Part name = {props.part3} ex = {props.ex3}/>
        </>
    )
}

const Total = (props) => {
    return (
    <>
    <p>yhteensa {props.ex1 + props.ex2 + props.ex3} tehtävää</p>
    </>
    )
}
const Part = (props) => {
    return (
        <>
        <p>{props.name} {props.ex}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14
    return (
    <div>
     <Header course = {course}/>
     <Content part1 = {part1} ex1 = {exercises1} part2 = {part2} ex2 = {exercises2} part3 = {part3} ex3 = {exercises3}/>
     <Total ex1={exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
