const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        
        const {username,email,password,role} = req.body
        User.create({username,email,password,role})
        .then(result => {
            let payload = {username:result.username,_id:result._id}
            let token = generateToken(payload)
            res.status(201).json({token,username,email,id:result._id})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {username:user.username,_id:user._id}
                let token = generateToken(payload)
                res.status(200).json({token,username:user.username,email:user.email,id:user._id})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }
    static signGoogle(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let username 
        let email
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE
        })
            .then(ticket => {
                
                username= ticket.getPayload().name
                email= ticket.getPayload().email
                
                return User.findOne({username})
            })
            .then(user => {
                if (user){
                    const payload = {username}
                    let token = generateToken(payload)
                    res.status(201).json(token)
                }
                else{
                    console.log(',asssdfsfsdfsdfs nih');
                    return User.create({username,email, password:"google"})
                }
            })
            .then(result => {
                let payload = {username:result.username}
                let token = generateToken(payload)
                res.status(201).json(token)
            })
            .catch(next)
    }

}

module.exports = UserController