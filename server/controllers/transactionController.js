const Transaction = require('../models/transaction')

class TransactionController {

  static transactionList(req,res,next){
    Transaction.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static addTransaction(req,res,next){
    const {cart,total} = req.body
    const {_id} = req.loggedUser
    Transaction.create({cart, total, user: _id})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static removeTransaction(req,res,next){
    const {id} = req.params
    Transaction.deleteOne({_id:id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TransactionController
