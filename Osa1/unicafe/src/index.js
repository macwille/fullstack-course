import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({feedback, good, neutral, bad}) => {
        if (feedback === 0) {
            return (
                <div>
                <h2>
                    Statistics
                </h2>
                <p> no feedback given</p>
                </div>
            )
        }
        return (
            <div>
            <h2> Statistics

            </h2>
            good {good}
            <br></br>
            neutral  {neutral}
            <br></br>
            bad {bad}
            <br></br>
            all {feedback}
            <br></br>
            average {(good - bad) / feedback}
            <br></br>
            positive {good / feedback} %
            </div>
            

        )
    

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [feedback, setFeedBack] = useState(0)

    const handleGoodClick = () => {
        setGood(good +1)
        setFeedBack(feedback+1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral +1)
        setFeedBack(feedback+1)
    }
    const handleBadClick = () => {
        setBad(bad +1)
        setFeedBack(feedback+1)
    }
    
    return (
        <div>
            <h1> Give feedback</h1>
            <button onClick = {handleGoodClick}>Good</button>
            <button onClick = {handleNeutralClick}>Neutral</button>
            <button onClick = {handleBadClick}>Bad</button>

            <Statistics feedback = {feedback} good = {good} neutral = {neutral} bad = {bad}></Statistics>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

