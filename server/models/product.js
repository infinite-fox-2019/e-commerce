const mongoose = require("mongoose")
const Shema = mongoose.Schema

const productShema  = new Shema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', productShema)
module.exports = Product