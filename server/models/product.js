const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
  "name": {
    "type": "String",
    required: [true, 'Product must have a name']
  },
  "price": {
    "type": "Number",
    required: [true, 'Product must have a price'],
    min: [0, 'Cannot set negative value']
  },
  "stock": {
    "type": "Number",
    required: [true, 'Product must have a price'],
    min: [0, 'Cannot set negative value']
  },
  "image": { "type": "String" }
}, { timestamps: true })

const Product = mongoose.model('Products', productSchema)

module.exports = Product