const jwt = require('jsonwebtoken')
const Dashboard = require('../models/dashboard')

function isAuthorized(req, res, next) {
    const id = {
        _id: req.params.id
    }

    Dashboard.findOne(id)
        .then(dashboard => {
            if(dashboard.user == req.LoggedUser.id) {
                next()
            } else{
                throw {
                    status: 401,
                    msg: "Not Authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = isAuthorized