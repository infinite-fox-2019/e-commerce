const jwt = require("jsonwebtoken")

generateToken = function(payload){
    return jwt.sign(payload, process.env.JWT_SECRET)
}

verifyToken = function(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}