import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const handleVote = () => {
        props.points[selected] += 1
        console.log(props.points)
    }

    const handleNext = () => {
        console.log('next anecdote clicked')
        let nextNumber  = getRandomNumber(0, props.anecdotes.length)
        console.log(nextNumber)
        setSelected(nextNumber)
    }

    let mostVoted = points.indexOf(Math.max(...points));

 
return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br/>
        has {props.points[selected]} votes
        <br/>
        <button onClick = {handleVote}> vote </button>
        <button onClick = {handleNext}> next anecdote </button>

        <h1> Anecdote with the most votes</h1>
        {props.anecdotes[mostVoted]}
        <br/>
        has {props.points[mostVoted]} points
        

    </div>
)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The fist 90 precent of the code accounts for the first 90 precent of the development time... time reaining 10 precent of the code accounts for the other 90 precent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humands can understand.',
    'Premature optimization is the root of all evil.',
    'Debuggin is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart eough to debug it.']

const points = new Array(anecdotes.length).fill(0);
console.log(points)



ReactDOM.render(<App anecdotes = {anecdotes} points = {points}/>, document.getElementById('root'));
