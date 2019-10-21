const User = require('../models/User')
const Product = require('../models/Product')
const { generateToken, verify } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

    class UserController {

        static register(req, res, next) {
            const { email, password, role } = req.body
            User.create({ email, password, role })
                .then(user => {
                    let payload = {
                        id: user._id
                    }
                    let token = generateToken(payload)
                    res.status(201).json({ token , role: user.role})
                })
                .catch(next)
        }

        static login(req, res, next) {
            const { email, password } = req.body
            User.findOne({ email })
                .then(user => {
                    if(user){
                        if (compare(password, user.password)) {
                            let payload = {
                                id: user._id
                            }
                            let token = generateToken(payload)
                            res.status(200).json({ token, role: user.role })
                        } else {
                            next({
                                status: 403,
                                message: 'username/password is wrong'
                            })
                        }
                    } else {
                        next({
                            status: 403,
                            message: 'username/password is wrong'
                        })
                    }
                })
                .catch(next)
        }

        static addCart(req, res, next){
            const { id } = req.decode
            const { productId, qty } = req.body

            Product.findById(productId)
                .then(product =>{
                    if(product){
                        if(Number(qty) > product.stock){
                            next({
                                status: 400,
                                message: 'out of stock'
                            })
                        }
                        else {
                            product.stock -= Number(qty)
                            console.log(product.stock);
                            product.save()
                            return User.findOneAndUpdate({_id: id}, { $push: { cart: { productId, qty }}}, {useFindAndModify: false})
                        }
                    } else {
                        next({
                            status: 404,
                            message: 'product not found'
                        })
                    }
                })
                .then(user =>{
                    if(user){
                        res.status(201).json({
                            message: 'Added to Cart'
                        })
                    }
                })
                .catch(next)
        }



        static getCart(req, res, next){
            const {id} = req.decode
            User.findById(id).populate('cart.productId')
                .then(user =>{
                    let carts = []
                    user.cart.forEach(el => {
                        el.subTotal = el.productId.price * Number(el.qty)
                        carts.push(el)
                    });
                    res.status(200).json(carts)
                })
                .catch(next)
        }

        static deleteCart(req, res, next){
            const cartId = req.params.id
            const { id } = req.decode
            let productId = null
            let qty = 0
            User.findById(id).populate('cart.productId')
                .then(user =>{
                    user.cart.forEach(cart =>{
                        if(cart._id.toString() === cartId){
                            productId = cart.productId
                            qty = Number(cart.qty)
                        }
                    })
                    return Product.findById(productId)
                })
                .then(product =>{
                    product.stock += qty
                    product.save()
                    return User.findByIdAndUpdate(id, { $pull: { cart: { _id : cartId } } })
                })
                .then(() => {
                    res.status(200).json('success delete cart');
                  })
                  .catch(next)
        }
    }

        

module.exports = UserController