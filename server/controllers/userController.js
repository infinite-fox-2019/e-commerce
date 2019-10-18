const User = require('../models/user');
const { compare } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
const ObjectId = require('mongoose').Types.ObjectId;


class UserController {

    static register(req, res, next) {

        const { name, email, password, role } = req.body;

        User.create({ name, email, password, role })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {

        const { email, password } = req.body;

        User.findOne({ email })
            .then(user => {
                if (user && compare(password, user.password)) {

                    const token = generateToken({ id: user._id, role: user.role })

                    res.status(200).json({ token })
                } else {
                    res.status(400).json({ message: 'Wrong email/password' })
                }
            })
            .catch(next)

    }

    static verify(req, res, next) {
        try {
            verifyToken(req.headers.token)
            res.status(200).json({ message: 'User verified' })
        } catch (err) {
            next(err)
        }
    }

    static addCart(req, res, next) {
        const { item } = req.body

        User.findById(req.loggedUser.id)
            .then(user => {
                user.cart.push(item)

            })
            .catch(next)
    }

    static updateCart(req, res, next) {
        const { item } = req.body
            // req.body = { productId: id product, qty: number , price: number}
        User.findById(req.loggedUser.id)
            .then(user => {
                user.cart.forEach(oldItem => {
                    if (oldItem.productId == ObjectId(item.productId)) {
                        oldItem.qty = item.qty
                        oldItem.price = item.price
                    }
                })
                return user.save()
            })
            .then(response => {
                res.status(200).json({ message: 'Successfully updated items in your cart' })
            })
            .catch(next)
    }


    static checkout(req, res, next) {
        User.findById(req.loggedUser.id)
            .then(user => {
                user.cart = []
                return user.save()

            })
            .then(response => {
                res.status(200).json({ message: 'Successfully checkout from cart' })
            })
            .catch(next)

    }
}


module.exports = UserController