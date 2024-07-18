const express = require('express')
const app = express()

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => req.method !== 'POST'
  })
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const db = require('./db')
const baseAPIUrl = '/api'

app.get('/', (request, response) => {  
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${db.persons.length} people</p>
    <p>${date.toString()}</p>
  `)
})


app.get(`${baseAPIUrl}/persons`, (request, response) => {
  response.json(db.persons)
})

app.get(`${baseAPIUrl}/persons/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = db.persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }

  response.statusMessage = "The person with the given id was not found"
  response.status(404).end()
})

app.delete(`${baseAPIUrl}/persons/:id`, (request, response) => {
  const id = Number(request.params.id)
  db.persons = db.persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = db.persons.length > 0
    ? Math.max(...db.persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post(`${baseAPIUrl}/persons`, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  if (db.persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  db.persons = db.persons.concat(person)
  response.json(person)
})

app.put(`${baseAPIUrl}/persons/:id`, (request, response) => {
  const id = Number(request.params.id)
  const body = request.body
  const person = db.persons.find(person => person.id === id)
  if (!person) {
    response.statusMessage = "The person with the given id was not found"
    return response.status(404).end()
  }

  const updatedPerson = {
    ...person,
    number: body.number
  }
  db.persons = db.persons.map(person => person.id !== id ? person : updatedPerson)
  response.json(updatedPerson)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})