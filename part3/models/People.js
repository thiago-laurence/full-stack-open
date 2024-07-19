const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to bd...')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        minlength: [3, 'Name must have at least 3 characters']
    },
    number: {
        type: String,
        required: [true, 'Number is required'],
        minlength: [8, 'Number must have at least 8 characters'],
        validate: {
          validator: function(v) {
            return /^\d{2,3}-\d{5,}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        }      
    },
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('People', peopleSchema)