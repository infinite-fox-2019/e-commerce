const Transaction = require('../models/Transaction')
const Product = require('../models/Product')
const User = require('../models/User')

class TransactionController {

    static checkout(req, res, next){
        const userId = req.decode.id
        let totalPrice = 0
        let items;
        User.findById(userId).populate('cart.productId')
            .then(user =>{
                items = user.cart
                user.cart.forEach(cart => {
                    totalPrice += (Number(cart.qty) * Number(cart.productId.price))
                });
                return User.updateOne({_id : userId}, { "$set": {"cart": []}})
            })
            .then(()=>{
                return Transaction.create({ items, totalPrice, userId })
            })
            .then(transaction =>{
                res.status(201).json(transaction)
            })
            .catch(next)

    }


    static find(req, res, next) {
        const userId = req.decode.id
        Transaction.find({ userId }).populate('items.productId').sort({ createdAt: -1 })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static findAdmin(req, res, next) {
        Transaction.find().populate('items.productId').populate('userId').sort({ createdAt: -1 })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static findPedingTrasactions(req, res, next) {
        const userId = req.decode.id
        Transaction.find({ userId, status: 'pending'}).populate('item.productId').sort({ createdAt: -1 })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static changeStatus(req, res, next){
        const transactionId = req.params.id
        const {status} = req.body
        Transaction.findByIdAndUpdate(transactionId, { status }).populate('item.productId').sort({ updatedAt: -1 })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static findById(req, res, next){
        console.log(`masuk pak eko`);
        const { id } = req.params
        Transaction.findById(id)
            .then(transaction =>{
                res.status(200).json(transaction)
            })
            .catch(next)
    }


}

module.exports = TransactionController