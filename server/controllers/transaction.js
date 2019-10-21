const Cart = require('../models/cart')

class CartController {
    static unpaid(req, res, next) {
        Cart.findOne({ status: 'unpaid', user: req.decode.id })
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
        const { firstName, lastName, email, phone, product, province, zip } = req.body
        Cart.findOne({ user: req.decode.id })
            .then(cart => {
                if (cart.status == 'unpaid') {
                    Cart.updateOne({ _id: cart._id }, {})
                } else {
                    Cart.create({ firstName, lastName, email, phone, product, province, zip })
                }
            })
    }

    static update(req, res, next) {
        Cart.findOneAndUpdate({ user })
    }
}

module.exports = CartController