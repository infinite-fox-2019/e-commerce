const User = require('../models/user');
const Product = require('../models/product')
const validateUpdateCart = require('../helpers/validateUpdateCart')

class CartController {
    static read(req, res, next) {
        const userId = req.decode.id
        User.findById(userId)
            .then((user) => res.status(200).json({ cart: user.cart }))
            .catch(next)
    }

    static add(req, res, next) {
        const userId = req.decode.id
        const { id: productId, quantity } = req.body
        if (quantity <= 0) return next({ status: 400, message: "You cannot buy a product with 0 or lower amount" })
        Product.findById(productId)
            .then((product) => {
                if (product) {
                    if (product.stock <= 0) {
                        next({ status: 400, message: "You cannot add a product with empty stock" })
                    } else if (quantity > product.stock) {
                        next({ status: 400, message: "You cannot buy a product higher than the stock have" })
                    } else {
                        return User.findById(userId).populate('cart.product')
                    }
                } else {
                    next({ status: 404, message: "There's no product with such id" })
                }
            })
            .then((user) => {
                console.log(user)
                res.status(200).json({ cart: user.cart })
            })
            .catch(next)
    }

    static remove(req, res, next) {
        const productId = req.params.id
        const userId = req.decode.id
        User.findById(userId)
            .populate('cart.product')
            .then((user) => {
                let oldCart = user.cart.filter(el => el.product._id === productId)
                if (oldCart.length) {
                    let newCart = user.cart.filter(el => el.product._id !== productId)
                    user.cart = newCart
                    return user.save()
                } else {
                    next({ status: 404, message: "There's no product with such id in your cart" })
                }
            })
            .then((user) => res.status(200).json({ cart: user.cart }))
            .catch(next)
    }

    static update(req, res, next) {
        try {
            validateUpdateCart(req.body)
                .then(() => {
                    User.findByIdAndUpdate(
                        req.decode.id,
                        { $set: { cart: req.body.data } },
                        { runValidators: true, new: true }
                    )
                }).then((user) => res.status(200).json({
                    cart: user.cart
                }))
        } catch (err) {
            next(err)
        }
    }

    static delete(req, res, next) {
        User.findByIdAndUpdate(req.decode.id, { $set: { cart: [] } })
            .then(() => res.status(200).json({ message: "Cart deleted" }))
            .catch(next)
    }
}

module.exports = CartController