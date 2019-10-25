const Cart = require('../models/cart')
const User = require('../models/user')

class cartController {
    static create(req, res, next) {
        const createdData = {
            user: req.body.user,
            product: req.body.product
        }

        Cart.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(next)
    }

    static display(req, res, next) {
        const id = {
            user: req.body.email
        }
        Cart.find(id)
            .then(cart_data => {
                res.status(200).json(cart_data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user_data => {
                return User.findByIdAndUpdate({ _id: user_data._id}, {
                    $push: {
                        cart: {
                            name: req.body.objproduct.name,
                            price: req.body.objproduct.price,
                            image: req.body.objproduct.image
                        }
                    }
                })
                    .then(updated_data => {
                        res.status(200).json(updated_data)
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = {
            _id: req.params.id
        }

        Cart.findByIdAndDelete(id)
            .then(deleted_data => {
                res.status(200).json(deleted_data)
            })
            .catch(next)
    }

}

module.exports = cartController