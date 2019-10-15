const { varify } = require('../helpers/jwt')
const Product = require('../models/product')
const User = require('../models/user')

function Authentication(req, res, next) {
    try {
        let decode = varify(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

function Authorization(req, res, next) {

    User.findById(req.decode.id)
        .then(user => {
            if (user.role == 'admin') {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}

module.exports = {
    Authentication,
    Authorization
}