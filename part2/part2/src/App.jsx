import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    useEffect(() => { 
      personsService.getAll().then(persons => setPersons(persons)) 
    }, [])
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleOnChange = (event, setState) => {
    setState(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === name)
    if (person !== undefined) {
      if(window.confirm(`'${name}' is already added to the numberbook, replace the old number with a new one?`)){
        const changedPerson = { ...person, number: number }
        personsService.update(person.id, changedPerson)
          .then(person => {
            setPersons(persons.map(p => p.id !== person.id ? p : person))
            setName('')
            setNumber('')
        })
      }
      return
    }
    const personObject = {
      // id: persons.length + 1,
      name: name,
      number: number
    }
    personsService.create(personObject)
      .then(person => {
        setPersons(persons.concat(person))
        setName('')
        setNumber('')
    })
  }

  const [query, setQuery] = useState('')
  const personsQuery = (persons[0] === undefined) ? Array(0)
    : (query === '') ? persons 
    :  persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  const handleRemove = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete '${person.name}' ?`)) {
      personsService.remove(id)
        .then(person => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(() => {
          alert(`The person '${person.name}' was already removed from the server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h1>Numberbook</h1>
      <Filter state={query} setState={setQuery} onChangeHandler={handleOnChange} />

      <h1>Add a new</h1>
      <PersonForm submitHandler={handleSubmit} name={name} number={number} setName={setName} setNumber={setNumber} onChangeHandler={handleOnChange} />
      
      <h2>Numbers</h2>
      <Persons persons={personsQuery} removeHandler={handleRemove} />
    </div>
  )
}

export default App