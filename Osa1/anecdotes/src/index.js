import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const handleVote = () => {

    }
    const handleNext = () => {
    }

    
return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br/>
        <button onClick = {handleVote}> vote </button>
        <button onClick = {handleNext}> next anecdote </button>

        <h1> Anecdote with the most votes</h1>
        {props.anecdotes[mostVotes]}
    </div>
)


}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The fist 90 precent of the code accounts for the first 90 precent of the development time... time reaining 10 precent of the code accounts for the other 90 precent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humands can understand.',
    'Premature optimization is the root of all evil.',
    'Debuggin is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart eough to debug it.']


ReactDOM.render(<App anecdotes = {anecdotes}/>, document.getElementById('root'));
