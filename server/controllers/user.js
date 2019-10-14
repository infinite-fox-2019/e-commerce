'use strict'

const { OAuth2Client } = require('google-auth-library')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')
const { User, Product, Transaction } = require('../models')

class UserController {
  static findAll (req, res, next) {
    User.find()
      .then((result) => {
        res.status(200).json(result)
      }).catch(next)
  }

  static register (req, res, next) {
    console.log(`Registering ${req.body.email}`)
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then((user) => {
        // console.log(user) // -> balikannya Object User dengan password yang sudah di hash
        const payload = {
          id: user._id,
          email: user.email,
          admin: user.admin
        }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully registered',
          token: token,
          name: user.name,
          email: user.email
        })
      })
      .catch(next)
  }

  static login (req, res, next) {
    console.log(`Logging in ${req.body.email}`)
    const { email, password } = req.body
    User.findOne({ email })
      .exec()
      .then((user) => {
        // Return a User object according to email
        if (user) {
          if (checkPassword(password, user.password)) {
            /// Create token using jsonwebtoken
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name
            }
            const token = generateToken(payload)
            console.log(token)
            res.status(200).json({ message: 'User successfully signed in', user: payload, token })
          } else {
            next({ status: 404, message: 'Invalid username/password!' })
          }
        } else {
          next({ status: 404, message: 'Invalid username/password!' })
        }
      }).catch(next)
  }

  static loginGoogle (req, res, next) {
    let payload = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (user) {
          console.log('User is already registered in the server')
          return user
        } else {
          console.log('Create new user!')
          return User.create({
            name: payload.name,
            email: payload.email,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then((user) => {
        payload = { id: user._id, email: user.email }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully logged in',
          token,
          name: user.name,
          email: user.email,
          admin: user.admin
        })
      })
      .catch(next)
  }

  static getCart (req, res, next) {
    const id = req.decoded.id
    User.findById(id).populate('cart.productId')
      .then((user) => {
        res.status(200).json(user.cart)
      }).catch(next)
  }

  static checkout (req, res, next) {
    const id = req.decoded.id
    User.findById(id).populate('cart.productId')
      .then((user) => {
        let isStockAvailable = true
        for (const item of user.cart) {
          console.log(`"${item.productId.name}" Stock: ${item.productId.stock}, inCart: ${item.qty}`)
          if (item.quantity > item.productId.quantity) {
            isStockAvailable = false
          }
          if (!isStockAvailable) {
            const error = { status: 400, message: 'Insufficient stock to checkout' }
            throw error
          } else {
            const promises = []
            // Doing a second loop makes sure that: either ALL db updates run or NO db upadetes run (no in between).
            // Pushing the promise to the promises array runs the starts the update.
            for (const item of user.cart) {
              // Query to decrement stock of a product by qty of that product in cart
              promises.push(
                Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.qty } }, { new: true }).exec()
              )
            }
            // Create transaction recording list of products and qty purchased
            promises.push(Transaction.create({
              products: user.cart,
              buyer: user._id
            }))
            return Promise.all(promises)
          }
        }
      }).then(results => {
        let transaction
        for (const result of results) {
          if (result.buyer) { // Only the result from the Transaction.create() promise has property 'buyer'
            transaction = result
          }
        }
        User.findByIdAndUpdate(req.userData.id, { $set: { cart: [] } }) // Empty cart
          .exec()
          .then(() => {
            res.status(201).json(transaction)
          })
          .catch(next)
      })
      .catch(next)
  }
}

module.exports = UserController
