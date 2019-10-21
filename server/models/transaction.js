const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
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
  },
  total:{
    type: Number
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction