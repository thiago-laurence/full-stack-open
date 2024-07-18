import axios from 'axios'

const baseUrl = 'http://localhost:3001/countries'
const APIWeather = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API-key}'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const findAll = () => {
    return axios.get(`${baseUrl}`)
        .then(response => response.data)
}

const findByName = (name) => {
    return findAll()
        .then(countries => countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase())))
}

const findWeather = (lat, lon) => {
    return axios.get(`${APIWeather.replace('{lat}', lat).replace('{lon}', lon).replace('{API-key}', api_key)}`)
        .then(response => response.data)
}

export default { findAll, findByName, findWeather }