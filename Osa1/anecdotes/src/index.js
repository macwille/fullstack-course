import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes, points }) => {
    const [selected, setSelected] = useState(0)
    const [mostVoted, setMostVoted] = useState(0)
    const [votes, setVotes] = useState(0)


    // En keksinyt miten korvata kopiolla vanha points taulukko
    const handleVote = () => {
        points[selected] += 1
        console.log(points)
        let mostVoted = points.indexOf(Math.max(...points));
        setMostVoted(mostVoted)
        setVotes(points[selected])

    }

    const handleNext = () => {
        console.log('next anecdote clicked')
        let nextNumber = getRandomNumber(0, anecdotes.length)
        console.log('selected anectode: ', nextNumber)
        setSelected(nextNumber)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <h3>{anecdotes[selected]}</h3>
            <br />
        this anecdote has {points[selected]} votes.
            <br />
            <button onClick={handleVote}>vote</button>
            <button onClick={handleNext}>next anecdote</button>
            <h1>Anecdote with the most votes</h1>
            <h3>{anecdotes[mostVoted]}</h3>
            <br />
        most votes with {points[mostVoted]} votes cast.
            {}

        </div>
    )
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.']

const points = new Array(anecdotes.length).fill(0);
console.log('anecdotes length = ', anecdotes.length)
console.log(points)



ReactDOM.render(<App anecdotes={anecdotes} points={points} />, document.getElementById('root'));
