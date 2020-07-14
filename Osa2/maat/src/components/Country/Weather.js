import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherData, setData] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const capital = country.capital
    console.log('Weather called: ', country)
    console.log('API ', api_key)

    const weatherHook = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                console.log('promise fulfilled', response.data)
                setData(response.data.current)

            })
    }
    useEffect(weatherHook, [])




    return (
        <div>
            <h3>Weather in {capital} observed at {weatherData.observation_time}</h3>
            <p>Temperature: {weatherData.temperature}</p>
            <img src={weatherData.weather_icons} />
            <p> {weatherData.weather_descriptions}</p>

        </div>
    )
}
export default Weather