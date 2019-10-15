const { verifyToken } = require('../helpers/jwt');
const Product = require('../models/product');

module.exports = {
    authenticate(req, res, next) {
        try {
            const decode = verifyToken(req.headers.token)
            req.loggedUser = decode
            next()
        } catch (err) {
            next(err)
        }
    },
    authorize(req, res, next) {
        if (req.loggedUser.role === 'admin') {
            next()
        } else {
            res.status(403).json({ message: 'Authorization failed' })
        }
    }
}