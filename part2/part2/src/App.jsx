import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (name !== '') {
      countriesService.findByName(name)
        .then(countries => {
          if (countries.length > 10) {
            setMessage('Too many matches, specify another filter')
            setCountries(null)
            return
          }
          if (countries.length > 1 && countries.length <= 10) {
            setMessage('')
            setCountries(countries)
            return
          }
          if (countries.length === 1) {
            setMessage('')
            setCountries(countries[0])
            return
          }
          setMessage('No matches')
          setCountries(null)
        })
        .catch(error => console.error(error))
    }else{
      setMessage('')
      setCountries(null)
    }
  }, [name])

  const changeHandler = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <p>
        Find countries: 
        <input type='text' placeholder='Type a countrie name...' value={name} onChange={changeHandler} />
      </p>
      <div>
        {message && <p>{message}</p>}
        {countries && Array.isArray(countries) && countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        {countries && !Array.isArray(countries) && (
          <div>
            <h1>{countries.name.common}</h1>
            <p>Capital: {countries.capital}</p>
            <p>Area: {countries.area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(countries.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countries.flags.png} alt={countries.name.common} width='100' />
          </div>
        )}
      </div>
    </div>
  )
}

export default App