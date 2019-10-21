const { verifyToken } = require('../helpers/jwt')

function authentication (req,res,next) {
    const decode = verifyToken( req.headers.token )
    if (decode){
        req.decode = decode
        next()
    } else {
        next(err)
    }
}

module.exports = authentication;