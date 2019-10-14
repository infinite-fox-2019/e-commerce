const mongoose = require("mongoose")
const Shema = mongoose.Schema

const productShema  = new Shema({
  name: {
    type: String
  },
  qty: {
    type: Number
  },
  price: {
    type: Number
  }
})

const Product = mongoose.model('Product', productShema)
module.exports = Product