const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./Product')

cartSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: [true, 'aaa']
  },
  qty: {
    type: Number,
    required: [true, 'Quantity cannot be empty'],
    min: [1, 'Quantity cannot be zero or less']
  }
},
{
  versionKey: false
})

cartSchema.pre('save', function(next) {
  Product.findById(this.product)
    .then(product => {
      if(this.qty > product.stock) {
        throw {status: 400, msg: ['Quantity cannot be more than product stock']}
      } else {
        next()
      }
    })
    .catch(next)
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart