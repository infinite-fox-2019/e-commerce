const { decodeToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    try {
        const { token } = req.headers
        const loggedUser = decodeToken(token)
        req.loggedUser = loggedUser
        next()
    } catch (err) {
        next({ msg: 'Authentication Failed!' })
    }
}

const authorization = (req, res, next) => {
        if (req.loggedUser.role === "admin" || req.loggedUser.role || "owner") {
            next()
        } else {
            next({ msg: "You Are Unauthorized" })
        }
    }

module.exports = { authentication, authorization }