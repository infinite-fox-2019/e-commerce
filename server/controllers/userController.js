const User = require('../models/user');
const { compare } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/product');


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
        const { email, password } = req.body
        console.log(email, password, 'CONTROLLER');
        User.findOne({ email })
            .then(user => {
                console.log(user);
                if (user && compare(password, user.password)) {
                    const token = generateToken({ id: user._id, role: user.role })
                    res.status(200).json({ token, role: user.role })
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

    static getCart (req, res, next) {
        User.findById(req.loggedUser.id).populate('cart.id')
            .then(user=>{
                res.status(200).json(user)
            })
            .catch(next)
    }
    static updateCart(req, res, next) {
        const { cart } = req.body
        cart.id = ObjectId(cart.id)

        User.findByIdAndUpdate({ _id: req.loggedUser.id }, { cart }).populate('cart.id')
            .then(user => {
                // console.log(JSON.stringify(user, null, 2))
                // console.log(user);
                res.status(200).json(user)        
            })
            .catch(next)
    }
    static checkout(req, res, next) {
        const cart = []
        User.Update({ _id: req.loggedUser.id }, { $set: { cart } })
            .then(reponse=> {
                res.status(200).json({ message: 'Successfully checkout from cart' })
            })
            .catch(next)
    }
    static deleteFromCart (req, res, next) {
        const { id } = req.params
        const userId = req.loggedUser.id
        User.findByIdAndUpdate(userId, { $pull: { cart: { _id: id } } })
        .then(response=>{
            res.status(200).json({ message:'Successfully deleted item from cart'})
        })
        .catch(next)
    }
}


module.exports = UserController