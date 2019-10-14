'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const ObjectID = mongoose.Schema.Types.ObjectId

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: [0, 'Lowest price is Rp 0,-']
  },
  quantity: {
    type: Number,
    min: [0, 'Stock cannot be negative']
  },
  description: {
    type: String
  },
  imageName: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
