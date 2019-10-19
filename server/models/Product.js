const mongoose = require('mongoose')
const Schema = mongoose.Schema

productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  price: {
    type: Number,
    required: [true, 'Price cannot be empty'],
    min: [1, 'Price cannot be zero or less']
  },
  stock: {
    type: Number,
    required: [true, 'Stock cannot be empty'],
    min: [1, 'Stock cannot be zero or less']
  },
  series: {
    type: String,
    required: [true, 'You have to choose a series']
  },
  image: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
