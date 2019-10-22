const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_JWT

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, SECRET_JWT)
    },
    verify(token) {
        return jwt.verify(token, SECRET_JWT)
    }
}