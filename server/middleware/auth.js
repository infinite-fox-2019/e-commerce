const {decodeToken} = require('../helpers/jwt');
const User = require('../models/user');

function authentication (req,res,next) {
    try{
        if(req.headers.token){
            req.loggedUser = decodeToken(req.headers.token);    
            if(req.loggedUser){
                next()
            }else{
                throw error
            }
        }else{
            throw error
        }
    }
    catch(err){
        next({status:403,msg:'Authen'})
    }
}

function authorizationAdmin (req,res,next){
    try{
        const {role} = req.loggedUser;
        if(role == 'Admin'){
            next()
        }else{
            throw error
        }
    }
    catch(err){
        next({status:403,msg:'Author'})
    }
}


module.exports = {
    authentication,
    authorizationAdmin
}