import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (name !== '') {
      countriesService.findByName(name)
        .then(countries => {
          if (countries.length > 10) {
            setMessage('Too many matches, specify another filter')
            setWeather(null)
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
            countriesService.findWeather(countries[0].latlng[0], countries[0].latlng[1])
              .then(weather => {
                setWeather(weather)
              })
            return
          }
          setMessage('No matches')
          setCountries(null)
          setWeather(null)
        })
        .catch(error => console.error(error))
    }else{
      setMessage('')
      setWeather(null)
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
        {countries && Array.isArray(countries) && countries.map(country => 
          <div key={country.name.common}> 
            <p>{country.name.common}</p>
            <button onClick={() => setCountries(country)}>Show</button>
          </div>
        )}
        {countries && !Array.isArray(countries) && (
          <div>
            <h1>{countries.name.common}</h1>
            <p>Capital: {countries.capital}</p>
            <p>Area: {countries.area} km^2</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(countries.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countries.flags.png} alt={countries.name.common} width='100' />
          </div>
        )}
        {weather && (
          <div>
            <h1>Weather in {countries.capital}</h1>
            <p>{weather.weather[0].main + " - " + weather.weather[0].description}</p>
            <p>Temperature: {Math.floor(weather.main.temp - 273.15)}° Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App