const User = require('../models/user.js');
const {signToken} = require('../helpers/jwt');
const {comparePassword} = require('../helpers/password');

class UserController {
    static register(req,res,next){
        const {username,email,password,address} = req.body
        User.create({username,email,password,address})
            .then((data)=>{
                res.status(201).json(data)
            })
            .catch(next)
    }
    static login(req,res,next){
        const {username,password} = req.body;
        User.findOne({username})
            .then(user=>{
                console.log(user)
                if(comparePassword(password,user.password)){
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        address: user.address,
                        role: user.role
                    }
                    const serverToken = signToken(payload);
                    res.status(200).json({
                        token : serverToken
                    })
                }else{
                    throw error
                }
            })
            .catch(err=>{
                next({status: 404,msg: 'Wrong'})
            })
    }
}


module.exports = UserController;