const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  }
}, {versionKey: false})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart