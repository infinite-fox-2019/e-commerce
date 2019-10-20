const User = require('../models/user');
const Transaction = require('../models/transaction')
const mongoose = require('mongoose')
const Product = require('../models/product')

class TransactionController {
    static create(req, res, next) {
        const userId = req.decode.id
        let userData
        let promises = []
        User.findById(userId)
            .then((user) => {
                if (!user.cart.length) {
                    let err = new Error("Cannot create transaction with empty cart")
                    err.status = 400
                    throw err
                } else {
                    userData = user.cart
                    return user.updateOne({ $set: { cart: [] } })
                }
            })
            .then(() => {
                userData.forEach(el => {
                    promises.push(
                        Product.findByIdAndUpdate(
                            el.product, {
                            $subtract: ["$stock", () => el.quantity]
                        }))
                })
                return Promise.all(promises)
            })
            .then(() => {
                return Transaction.create({
                    owner: userId,
                    products: userData
                })
            })
            .then((transaction) => transaction.populate('products.product').execPopulate()
            )
            .then((transaction) => res.status(201).json(transaction))
            .catch(next)
    }

    static getTransactions(req, res, next) {
        const userId = req.decode.id
        Transaction.find({ owner: mongoose.Types.ObjectId(userId) })
            .populate('products.product')
            .then((transactions) => res.status(200).json(transactions))
            .catch(next)
    }

    static getPendingTransactions(req, res, next) {
        Transaction.find({ status: "pending" })
            .populate('products.product')
            .then((transactions) => res.status(200).json(transactions))
            .catch(next)
    }

    static getApprovedTransactions(req, res, next) {
        Transaction.find({ status: "approval" })
            .populate('products.product')
            .then((transactions) => res.status(200).json(transactions))
            .catch(next)
    }

    static getSingleTransaction(req, res, next) {
        res.status(200).json(req.transaction)
    }

    static setApproved(req, res, next) {
        Transaction.findByIdAndUpdate(req.params.id, { $set: { status: "approved" } })
            .then(() => res.status(200).json({ message: 'transaction set to approved' }))
            .catch(next)
    }

    static setDelivered(req, res, next) {
        Transaction.updateOne({ _id: req.transaction._id }, { $set: { status: "delivered" } })
            .then(() => res.status(200).json({ message: 'transaction set to delivered' }))
            .catch(next)
    }
}

module.exports = TransactionController