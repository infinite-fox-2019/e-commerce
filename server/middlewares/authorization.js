const Transaction = require('../models/transaction')

module.exports = {
    admin: (req, res, next) => {
        if (req.decode.role === 'admin') {
            next()
        } else {
            next({ status: 403, message: "Only administrator may access this resource" })
        }
    },
    transaction: (req, res, next) => {
        Transaction.findById(req.params.id)
            .populate('products.product')
            .then((Transaction) => {
                if (Transaction) {
                    req.transaction = Transaction
                    if (req.decode.role === 'admin') {
                        next()
                    } else if (Transaction.owner == req.decode.id) {
                        next()
                    } else {
                        next({ status: 403, message: "You are not the owner of this transaction" })
                    }
                } else {
                    next({ status: 404, message: "No transaction with such id found" })
                }
            })
    }
}