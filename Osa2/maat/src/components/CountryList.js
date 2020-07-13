import React from 'react'

const CountryList = (props) => {

    if (props.filter.length === 0) {
        return (
            <h3>filter empty</h3>
        )
    }

    const returnList =
        props.countries.filter(c => c.name.includes(props.filter))

    console.log('matches: ', returnList)
    if (returnList.length > 10) {
        return (
            <div>
                <h3>Too many matches</h3>
            </div>
        )
    }
    if (returnList.length === 1) {
        const country = returnList[0]

        console.log('single country :', country)
        return (
            <div>
                <h2>{country.name}</h2>
                <p>Capital city: {country.capital}</p>
                <p>Population: {country.population}</p>
                <br></br>
                <ul>

                </ul>
                <img src={country.flag} width="200" />
            </div >
        )
    }

    return (
        <div>
            <h3>Matches found: {returnList.length}</h3>
        </div>
    )
}

export default CountryList