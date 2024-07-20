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
    skip: (req) => req.method !== 'POST'
  })
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'MongoServerError'){
    return response.status(500).json({ error: error.message })
  }

  next(error)
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

app.get(`${baseAPIUrl}/persons/:id`, (request, response, next) => {
  People.findById(request.params.id)
    .then(person => {
      if (!person) {
        response.statusMessage = 'The person with the given id was not found'
        return response.status(404).end()
      }
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete(`${baseAPIUrl}/persons/:id`, (request, response, next) => {
  People.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post(`${baseAPIUrl}/persons`, (request, response, next) => {
  const person = new People({
    name: request.body.name,
    number: request.body.number
  })
  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put(`${baseAPIUrl}/persons/:id`, (request, response, next) => {
  const { number } = request.body
  People.findByIdAndUpdate(request.params.id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (!updatedPerson) {
        response.statusMessage = 'The person with the given id was not found'
        return response.status(404).end()
      }
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})