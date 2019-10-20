const Transaction = require('../models/transaction')
function adminAuthz (req, res, next) {
    if(req.decoded.role === 'admin'){
        next()
    } else {
        res.status(401).json({
            message : 'Unauthorized'
        })
    }
}

function transAuthz(req, res, next){
    Transaction.findById(req.params.id)
    .then(result =>{
        // console.log('ini decode', req.decoded._id);
        // console.log(result.user, '/<<<>><<>');
        if ( result &&result.user.toString() === req.decoded._id.toString()){
            // console.log('hereee donggg');
            next()
        }
        else {
            // console.log(result.user == req.decoded_id);
            // console.log('user : ',typeof result.user);
            // console.log('decd : ', typeof req.decoded._id);
            next({
                status : 401,
                message : 'Unauthorized'
            })
        }

    })
    .catch(next)
    
}

module.exports = {adminAuthz, transAuthz}