const { verify } = require('../helpers/jwt')
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Mongoose = require('mongoose')



function authentication(req, res, next) {
    const { token } = req.headers
    try {
        // payload is only contain id
        req.decode = verify(token)
        next()
    } catch (err) {
        next({
            status: 401,
            message: `Please login first`
        })
    }
}

function authorizationProduct(req, res, next) {
    let userId = req.decode.id
    User.findById(userId)
        .then(user =>{
            if(user.role !== 'admin'){
                next({
                    status: 403,
                    message: 'unauthorized'
                })
            } else {
                next()
            }
        })
   
}


function authorizationTrasaction(req, res, next) {
    let userId = req.decode.id
    let transactionId = req.params.id

    Transaction.findById(transactionId)
        .then(transaction =>{
            if(transaction.userId != userId){
                next({
                    status: 403,
                    message: 'unauthorized'
                })
            } else {
                next()
            }
        })
}

function authorizationAdmin(req, res, next){
    const userId = req.decode.id
    const { status } = req.body
    if(status !== 'paid' && status !=='done'){
        User.findById(userId)
        .then(user =>{
            if(user.role !== 'admin'){
                next({
                    status: 403,
                    message: 'unauthorized'
                })
            } else {
                next()
            }
        })
    } else {
        next()
    }
   
}

module.exports = { authentication,authorizationProduct, authorizationTrasaction, authorizationAdmin}