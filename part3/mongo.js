const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const connection = {
    user: 'thiago-laurence',
    password: process.argv[2],
    cluster: 'cluster.vdc6uks.mongodb.net',
    db: 'Phonebook',
}

const url =
  `mongodb+srv://${connection.user}:${connection.password}@${connection.cluster}/${connection.db}?retryWrites=true&w=majority&appName=Cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const People = mongoose.model('People', peopleSchema)

if (process.argv.length === 5) {
  const person = new People({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(() => {
    console.log('added', person.name, 'number', person.number, 'to phonebook')
    mongoose.connection.close()
  })

  process.exit(0)
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('give both name and number')
  process.exit(1)
}

if (process.argv.length === 3) {
  console.log('Phonebook:')

  People.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}