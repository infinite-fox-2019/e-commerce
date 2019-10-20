const verifyToken = require('../helpers/verifyToken')

function isLogin(req, res, next) {
    const token = req.headers.token

    try {
        const decodedToken = verifyToken(token)
        console.log('decodedToken =>', decodedToken)
        req.LoggedUser = decodedToken
        console.log(req.LoggedUser)
        next()
    }
    catch(err) {
        next(err)
    }
}

module.exports = isLogin