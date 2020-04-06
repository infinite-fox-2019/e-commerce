const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = {
    verifyToken(token) {
        return jwt.verify(token, secret)
    },
    generateToken(payload) {
        return jwt.sign(payload, secret)
    }

}