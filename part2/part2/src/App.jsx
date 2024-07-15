import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Martin Fowler', number: '24-11-5588763', id: 5 }
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
      phone: phone
    }
    setPersons(persons.concat(personObject))
    setName('Type another name...')
    setPhone('')
  }

  const [query, setQuery] = useState('')
  const personsQuery = (query === '') ? persons 
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