const {verifyToken} = require("../helpers/jwt")
// const Product = require("../models/user")

authentication = function(req, res, next){
    try{
        req.loggedUser = verifyToken(req.headers.token)
        next()
    }
    catch(err){
        next ({
            status : 403,
            message : "not login"
        })
    }
}

authorization = function(req,res,next){

    // let productId = req.params.id

    if(req.loggedUser.role === "admins"){
        next()
    }else {
        next({
            status : 403,
            message : "Not Authorized"
        })
    }

}

module.exports = {authentication, authorization}