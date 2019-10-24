const Cart = require('../models/cart')

class CartController {
    static unpaid(req, res, next) {
        Cart.findOne({ status: 'unpaid', user: req.decode.id }).populate('products')
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static paid(req, res, next) {
        Cart.find({ status: 'paid' })
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static sending(req, res, next) {
        Cart.findOne({ status: 'sending', user: req.decode.id })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static done(req, res, next) {
        Cart.find({ status: 'done' })
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { products } = req.body
        Cart.findOne({ user: req.decode.id })
            .then(cart => {
                if (!cart) {
                    return Cart.create({ products, status: 'unpaid', user: req.decode.id })
                } else if (cart.status == 'unpaid') {
                    return Cart.findByIdAndUpdate(cart._id, { $push: { products } }, { new: true })
                }
            })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static update(req, res, next) {
        Cart.findOneAndUpdate({ user })
    }
}

module.exports = CartController