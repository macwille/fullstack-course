import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('Finland')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        console.log('promise fulfilled', result.data)
        setCountries(result.data)
      })
  }
  useEffect(hook, [])

  const handleFilterInput = (event) => {
    console.log('filter change: ', event.target.value)
    setFilter(event.target.value)

  }

  return (
    <div className="App">
      <h1>Maat</h1>
      <form>
        Filter:
        <input
          onChange={handleFilterInput}
        />
      </form>
      <CountryList filter={filter} countries={countries} />
    </div>
  );
}

export default App;
