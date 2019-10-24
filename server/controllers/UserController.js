const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        const {username,password,email} = req.body
        User.create({username,password,email})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,username,_id:result._id})
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
                res.status(200).json({token,username:user.username,_id:user._id,role:user.role})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserController