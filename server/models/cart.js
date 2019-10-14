const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  cart: [{
    product: {
      type:Schema.Types.ObjectId,
      ref: 'Product'
    }, 
    qty:Number
  }],
  user: {
    type:Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart