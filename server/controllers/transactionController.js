const Transaction = require('../models/transaction')
const User = require('../models/user')
const Product = require('../models/product')

class transactionController {
    static display(req, res, next) {
        const id = {
            _id: req.params.id
        }

        Transaction.findById(id)
            .then(transaction_data => {
                res.status(200).json(transaction_data)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const createdData = {
            cart: req.params.id
        }

        Transaction.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user_data => {
                if (user_data.transaction.length === 0 || user_data.transaction.length === 1) {
                    return User.findByIdAndUpdate({ _id: user_data._id}, {
                        $push: {
                            transaction: {
                                name: user_data.name,
                                address: user_data.address,
                                total: req.body.total,
                            }
                        },
                        cart: []
                    })
                        .then(updated_data => {
                            res.status(200).json(updated_data)
                        })
                        .catch(next)
                } else {
                    throw {
                        message: 'Need to finish the old transaction first to make a new transaction',
                        statusCode: 500
                    }
                }
                
            })
            .catch(next)
       
    }

}

module.exports = transactionController