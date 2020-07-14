import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    console.log('Country called: ', country)
    console.log('name:', country.name)
    const languages = country.languages
    console.log(languages)

    return (
        <div>
            <h2>{country.name}</h2>
            <img src={country.flag} height="150" />
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages:</h4>
            <ul>
                {languages.map((item, i) => {
                    return <li key={i}>{item.name}</li>

                })}


            </ul>
            <Weather country={country}></Weather>

        </div>
    )
}

export default Country