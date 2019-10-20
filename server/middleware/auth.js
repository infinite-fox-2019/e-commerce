const { verifyedToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next){
    try {
        let decodeToken = verifyedToken(req.headers.token)
        req.logedUser = decodeToken
        next()
    }
    catch{
        res.status(500).json('You are not authentication!');
    }

}

function authorization(req, res, next){
    let { id } = req.logedUser
    User.findOne({ _id : id })
        .then(user => {
            if(user.role == 'admin'){
                next()
            } else {
                res.status(500).json('You are not Authorized!')
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
}

module.exports = { authentication, authorization }