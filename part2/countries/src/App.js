import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{ country.name }</h1>
      <NamedStat name={ "capital" } value={ country.capital } />
      <NamedStat name={ "population" } value={ country.population } />
      <h2>languages</h2>
      <ul>
        {
          country.languages.map(lang => <li key={ lang.iso639_1 }>{ lang.name }</li>)
        }
      </ul>
      <img src={ country.flag } alt={ country.name } height="100" width="150" />
      <Weather country={ country } />
    </div>
  )
}

const NamedStat = ({ name, value }) => <div>{ name } { value }</div>

const App = () => {

  const [ selected, setSelected ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')

  const countryApiUrl = 'https://restcountries.eu/rest/v2'
  const countryApiEndpoint_all = '/all'

  useEffect(() => {
    axios
      .get(`${countryApiUrl}${countryApiEndpoint_all}`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countryFilterHandler = (event) => {
    setCountryFilter(event.target.value)
    setSelected('')
  }
  const handleClick = (event) => setSelected(countries.find(country => country.name === event.target.value).name)

  const filteredCountries = () => {
    const filtered = countries.filter(country => country.name.toUpperCase().indexOf(countryFilter.toUpperCase()) > -1)

    if (filtered.length > 10)
      return <div>Too many matches, specify another filter</div>
    
    else if (filtered.length > 1) { 
      return filtered.map(country => (
        <div key={ country.numericCode }>
          { country.name }
          <button onClick={ handleClick } value={ country.name }>show</button>
        </div>
      ))
    }
    
    else if (filtered.length === 1)
      return <Country country={ filtered[0] } />
  }

  return (
    <div>
      find countries <input value={ countryFilter } onChange={ countryFilterHandler } />
      { selected ? <Country country={ countries.find(c => c.name === selected) } /> : filteredCountries() }
    </div>
  );
}

export default App;
