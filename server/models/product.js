const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  desc: String,
  stock: Number,
  price: Number,
  img_url: String
}, {versionKey: false})

const Product = mongoose.model('Product', productSchema)

module.exports = Product