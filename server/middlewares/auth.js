const { verifyToken } = require('../helpers/jwt');
const Product = require('../models/product');
const Transaction = require('../models/transaction');

module.exports = {
    authenticate(req, res, next) {
        try {
            const decode = verifyToken(req.headers.token)
            req.loggedUser = decode
            next()
        } catch (err) {
            next(err)   
        }
    },
    isAdmin(req, res, next) {
        if (req.loggedUser.role === 'admin') {
            next()
        } else {
            res.status(403).json({ message: 'Authorization failed' })
        }
    },
    authorize(req,res,next){
        if(req.loggedUser.role === 'admin') {
            next()
        } else {

            const {id} = req.params
            Transaction.findById(id)
            .then(transaction=>{
                console.log(transaction.user._id, '==', req.loggedUser.id );
                if(transaction.user._id.toString() === req.loggedUser.id){
                    next()
                } else {
                    res.status(403).json({ message: 'Authorization failed' })
                }
            })
            .catch(next)
        }
    }
}