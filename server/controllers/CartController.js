const Cart = require('../models/cart')

class CartController {
    static create(req, res, next){
        const {user_id, product_id} = req.body
        Cart.create({user_id, product_id})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = CartController