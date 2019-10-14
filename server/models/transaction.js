'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  delivered: {
    type: Boolean,
    default: false
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
