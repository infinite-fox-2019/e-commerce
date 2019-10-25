const jwt = require('jsonwebtoken');

function signToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET)
}
function decodeToken(token){
    return jwt.decode(token);
}

module.exports ={
    signToken,
    decodeToken
}