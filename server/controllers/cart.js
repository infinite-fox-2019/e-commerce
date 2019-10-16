const Cart = require('../models/cart')
class CartController {
    static findAll (req, res, next) {
        Cart.find({ customer_id: req.loggedUser._id }).populate("customer_id").populate("product_id").exec()
        .then(items => {
            res.status(200).json(items)
        })
        .catch(next)
    }
    static create (req, res, next) {
        const { product_id } = req.body
        Cart.findOne({ product_id, customer_id: req.loggedUser._id }).exec()
        .then(item => {
            if (item) {
                Cart.updateOne({ customer_id: req.loggedUser._id, product_id: item.product_id },
                    { quantity: item.quantity + 1 }).exec()
                .then(() => {
                    res.status(200).json({ response: "Item Updated Successfully" })
                })
                .catch(next)
            } else {
                Cart.create({ product_id, customer_id: req.loggedUser._id, quantity: 1 })
                .then(() => {
                    res.status(201).json({ response: "Item Added Successfully" })
                })
                .catch(next)
            }
        })
        .catch(next)
    }
    static update(req, res, next) {
        const { operation } = req.body
        const { product_id } = req.params
        Cart.findOne({ product_id, customer_id: req.loggedUser._id }).exec()
        .then(item => {
            if (item.quantity === 1 && operation === "minus") {
                Cart.deleteOne({ product_id: item.product_id, customer_id: item.customer_id }).exec()
                .then(() => {
                    res.status(200).json({ response: "Item Updated Successfully" })
                })
                .catch(next)
            } else {
                if (operation === "plus") {
                    Cart.updateOne({
                        customer_id: req.loggedUser._id,
                        product_id: item.product_id
                    }, { quantity: item.quantity + 1 }).exec()
                    .then(() => {
                        res.status(200).json({ response: "Item Updated Successfully" })
                    })
                    .catch(next)
                } else if (operation === "minus") {
                    Cart.updateOne({
                        customer_id: req.loggedUser._id,
                        product_id: item.product_id
                    }, { quantity: item.quantity - 1 }).exec()
                    .then(() => {
                        res.status(200).json({ response: "Item Updated Successfully" })
                    })
                    .catch(next)
                } else {
                    next({ msg: "Invalid Input" })
                }
            }
        })
        .catch(next)
    }
    static delete (req, res, next) {
        const { product_id } = req.params
        Cart.deleteOne({ product_id, customer_id: req.loggedUser._id }).exec()
        .then(() => {
            res.status(200).json({ response: "Item Successfully Removed" })
        })
        .catch(next)
    }
}

module.exports = CartController