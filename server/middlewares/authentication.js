const { verifyUser } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return next({ status: 401, message: "Token is not set for this request" })
    const auth = authorization.replace('Bearer ', '')
    try {
        req.decode = verifyUser(auth)
        next()
    } catch (err) {
        next(err)
    }
}
