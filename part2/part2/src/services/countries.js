import axios from 'axios'

const baseUrl = 'http://localhost:3001/countries'

const findAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
}

const findByName = (name) => {
    return findAll()
        .then(countries => countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase())))
}

export default { findAll, findByName }