const Cart = require('../models/Cart')

class CartController {
    static create(req,res,next) {
        const {userId,productId} = req.body
        Cart.create({userId,productId})
        .then(cart=>{
            res.status(201).json(cart)
        })
        .catch(next)
    }
}

module.exports = CartController