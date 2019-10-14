'use strict'

const { Transaction } = require('../models')

class TransactionController {
  // Find all current user's transaction
  static findMine (req, res, next) {
    Transaction.find({ buyer: req.userData.id }).populate('products.productId')
      .then((transaction) => {
        res.status(200).json(transaction)
      }).catch(next)
  }

  // Find all transactions
  static findAll (req, res, next) {
    Transaction.find().populate('product.productId').populate('buyer')
      .then((transactions) => {
        res.status(200).json(transactions)
      }).catch(next)
  }

  // Mark transaction as shipped
  static shipped (req, res, next) {
    const id = req.params.id
    Transaction.findByIdAndUpdate(id, { $set: { delivered: true } }, { new: true })
      .then((transaction) => {
        res.status(200).json(transaction)
      }).catch(next)
  }
}

module.exports = TransactionController
