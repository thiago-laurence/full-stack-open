const express = require('express')
const app = express()
require('dotenv').config()

const People = require('./models/People')

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


const baseAPIUrl = '/api'

app.get('/', (request, response) => {  
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  People.find({}).then(persons => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toString()}</p>
    `)
  })
})

app.get(`${baseAPIUrl}/persons`, (request, response) => {
  People.find({}).then(persons => {
    response.json(persons)
  })
})

app.get(`${baseAPIUrl}/persons/:id`, (request, response) => {
  People.findById(request.params.id)
    .then(person => response.json(person))
    .catch(() => {
      response.statusMessage = "The person with the given id was not found"
      response.status(404).end()
    })
})

app.delete(`${baseAPIUrl}/persons/:id`, (request, response) => {
  People.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
})

app.post(`${baseAPIUrl}/persons`, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = new People({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => response.json(savedPerson))
})

app.put(`${baseAPIUrl}/persons/:id`, (request, response) => {
  People.findByIdAndUpdate(request.params.id, { number: request.body.number }, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(() => {
      response.statusMessage = "The person with the given id was not found"
      response.status(404).end()
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})