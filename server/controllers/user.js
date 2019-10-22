const User = require('../models/user')
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static findLoggedIn(req, res, next) {
        User.findById(req.loggedUser._id).populate('cart cart.product')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static register(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin
        })
            .then(createdUser => {
                res.status(201).json({ createdUser })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        }).populate('cart cart.product')
            .then(user => {
                if (!user) next({ name: "LoginError" })
                else if (!compare(req.body.password, user.password)) next({ name: "LoginError" })
                else {
                    let payload = {
                        username: user.username,
                        email: user.email,
                        cart: user.cart,
                        _id: user._id,
                        admin: user.admin
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ token, user: payload })
                }
            })
            .catch(next)
    }

    static edit(req, res, next) {
        console.log(req.body)
        let { cart } = req.body
        User.updateOne({ _id: req.loggedUser._id }, { cart })
            .then(data => {
                res.status(200).json({ message: 'update success' })
            })
            .catch(next)
    }

    static addToCart(req, res, next) {
        let promises = []
        for (let index = 0; index < req.body.qty; index++) {
            promises.push(User.updateOne({ _id: req.loggedUser._id }, { $push: { cart: req.body.productId } }))
        }
        return Promise.all(promises)
            .then(updateData => {
                if (updateData) {
                    res.status(201).json({ message: 'successfully add product to cart' })
                } else {
                    next({ name: 'CastError' })
                }
            })
            .catch(next)
    }

    static removeFromCart(req, res, next) {
        User.findById(req.loggedUser._id)
            .then(user => {
                if (user.cart.length != 1) {
                    let promises = []
                    promises.push(User.findOneAndUpdate({ _id: req.loggedUser._id, cart: req.body.productId }, { $unset: { 'cart.$': "" } }))
                    // promises.push(User.findOneAndUpdate({_id: req.loggedUser._id, cart:null}, { $pull: { cart : null }} ))
                    promises.push(User.findOneAndUpdate({ _id: req.loggedUser._id }, { $pull: { cart: null } }))
                    return Promise.all(promises)
                        .then(arr => {
                            res.status(200).json({ message: 'successfully removed product from cart' })
                        })
                        .catch(next)
                } else {
                    User.updateOne({ _id: req.loggedUser._id }, { cart: [] })
                        .then(arr => {
                            res.status(200).json({ message: 'successfully removed product from cart' })
                        })
                        .catch(next)
                }
            })


        // let promises = []
        // promises.push(User.findOneAndUpdate({_id: req.loggedUser._id, cart:req.body.productId}, { $unset: { 'cart.$' : "" }} ))
        // // promises.push(User.findOneAndUpdate({_id: req.loggedUser._id, cart:null}, { $pull: { cart : null }} ))
        // promises.push(User.findOneAndUpdate({_id: req.loggedUser._id}, { $pull: { cart : null }} ))
        // return Promise.all(promises)
        // .then(arr => {
        //     res.status(200).json({ message: 'successfully removed product from cart' })
        // })
        // .catch(next)
    }

    static checkout(req, res, next) {
        let items = []
        User.findById(req.loggedUser._id)
            .then(user => {
                let listProduct = user.cart
                let toCheckout = {}
                listProduct.forEach(product => {
                    if (!toCheckout[product]) toCheckout[product] = 1
                    else toCheckout[product]++
                });
                
                let promise = []
                for (let key in toCheckout) {
                    let obj = {
                        product : key,
                        qty : toCheckout[key]
                    }
                    items.push(obj)
                    promise.push(Product.updateOne({ _id: key }, { $inc: { 'qty': toCheckout[key] * (-1) } }, { runValidators: true }))
                }
                let transaction = {
                    UserId : req.loggedUser._id,
                    items 
                }
                promise.push(Transaction.create(transaction))
                return Promise.all(promise)
            })
            .then(updatedData => {
                return User.findById(req.loggedUser._id).populate('cart cart.product')
            })
            .then(user => {
                return User.updateOne({ _id: req.loggedUser._id }, { cart: [] })
            })
            .then(updateData => {
                if (updateData.n) {
                    res.status(200).json({ message: 'successfully checkout' })
                } else {
                    next({ name: "CastError" })
                }
            })
            .catch(next)
    }
}

module.exports = Controller

//populate array element
// return User.findById(req.loggedUser._id).populate('cart cart.product')