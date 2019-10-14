const Cart = require('../models/cart')

class CartController {
    static create(req, res, next) {
        const { product_id } = req.params
        const customer_id = req.loggedUser._id
        const { quantity } = req.body
        Cart.create({ product_id, customer_id, quantity })
        .then(() => {
            res.status(201).json({ response: "Item Added To Cart Successfully" })
        })
        .catch(next)
    }
    static update(req, res, next) {
        const { product_id } = req.params
        const customer_id = req.loggedUser._id
        const { quantity } = req.body
        Cart.updateOne({ product_id, customer_id }, { quantity }).exec()
        .then(() => {
            res.status(200).json({ response: "Item Updated Successfully" })
        })
        .catch(next)
    }
    static delete(req, res, next) {
        const { product_id } = req.params
        const customer_id = req.loggedUser._id
        Cart.deleteOne({ product_id, customer_id }).exec()
        .then(() =>{
            res.status(200).json({ response: "Item Removed Successfully" })
        })
        .catch(next)
    }
}

module.exports = CartController