const jwt = require('jsonwebtoken')
// const salt = process.env.SALT
const SALT = 'ecommerce'

function generateToken(payLoad) {
    return jwt.sign(payLoad, SALT)
}

function verifyedToken(token){
    return jwt.verify(token, SALT)
}

module.exports = {
    generateToken,
    verifyedToken
}