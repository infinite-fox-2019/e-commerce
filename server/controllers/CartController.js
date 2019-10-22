const Cart = require('../models/Cart')

class CartController {
    static create(req,res,next) {
        const {userId,productId,qty} = req.body
        Cart.create({userId,productId,qty})
        .then(cart=>{
            console.log(cart,'ini cart');
            
            res.status(201).json(cart)
        })
        .catch(next)
    }
}

module.exports = CartController