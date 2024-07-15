import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    useEffect(() => { 
        axios.get('http://localhost:3001/persons')
        .then(response => { setPersons(response.data) })
    }, [])
  ])
  const [name, setName] = useState('Type a name...')
  const [phone, setPhone] = useState('')

  const handleOnChange = (event, setState) => {
    setState(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === name)) {
      alert(`${name} is already added to the phonebook`)
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: name,
      number: phone
    }
    setPersons(persons.concat(personObject))
    setName('Type another name...')
    setPhone('')
  }

  const [query, setQuery] = useState('')
  const personsQuery = (persons[0] === undefined) ? Array(0)
    : (query === '') ? persons 
    :  persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter state={query} setState={setQuery} onChangeHandler={handleOnChange} />

      <h1>Add a new</h1>
      <PersonForm submitHandler={handleSubmit} name={name} phone={phone} setName={setName} setPhone={setPhone} onChangeHandler={handleOnChange} />
      
      <h2>Numbers</h2>
      <Persons persons={personsQuery} />
    </div>
  )
}

export default App