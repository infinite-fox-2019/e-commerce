const Transaction = require('../models/transaction')

class TransactionController {
    static create(req, res, next) {
        const { product_id } = req.params
        const customer_id = req.loggedUser._id
        const { quantity } = req.body
        Transaction.create({ product_id, customer_id, quantity })
        .then(() => {
            res.status(201).json({ response: "Item Added To Transaction Successfully" })
        })
        .catch(next)
    }
    static delete(req, res, next) {
        const { product_id } = req.params
        const customer_id = req.loggedUser._id
        Transaction.deleteOne({ product_id, customer_id }).exec()
        .then(() =>{
            res.status(200).json({ response: "Item Removed From Transaction Successfully" })
        })
        .catch(next)
    }
}

module.exports = TransactionController