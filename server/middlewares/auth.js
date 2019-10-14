const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Cart = require('../models/Cart')


function authentication(req, res, next){
    
    try {
        let decodedToken = verifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    }
    catch(err) {
        next(err)
    }
}

function authorization(req, res, next){
    
    
    let {id} = req.params
    Cart.findOne({_id:id})
        .then(article => {
        
            console.log('ini logged',req.loggedUser);
            
            if(article.userId == req.loggedUser._id) {
                next()
            } else{
                throw {
                    status: 401,
                    msg: "not authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {authentication, authorization} 