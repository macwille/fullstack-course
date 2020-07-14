import React from 'react'
import Country from './Country/Country'

const CountryList = (props) => {

    console.log('CountryList called: ', props)

    if (props.filter.length === 0) {
        return (
            <h3>There are 250 countries so add a filter.</h3>
        )
    }

    const returnList =
        props.countries.filter(c => c.name.includes(props.filter))

    console.log('matches: ', returnList)
    if (returnList.length > 10) {
        return (
            <div>
                <h3>Way too many matches</h3>
            </div>
        )
    }

    if (returnList.length === 1) {
        const country = returnList[0]

        console.log('single country :', country)
        return (
            <div>
                <Country country={country}></Country>
            </div >
        )
    }
    const handleShowClick = (event) => {
        console.log(event.target)
        props.setFilter(event.target.value)
        console.log()
    }
    if (returnList.length === 0) {
        return (
            <div>
                <h3>No matches for you excelent search</h3>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {returnList.map((item, i) => {
                    return <li key={i}>{item.name}
                        <button onClick={handleShowClick} value={item.name}>show</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CountryList