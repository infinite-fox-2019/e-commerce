const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, 'e-commerce')
}

function verify(token) {
    return jwt.verify(token, 'e-commerce')
}

module.exports = {
    generateToken,
    verify
}