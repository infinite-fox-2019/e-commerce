const User = require('../models/user.js');
const {signToken} = require('../helpers/jwt');
const {comparePassword} = require('../helpers/password');

class UserController {
    static findAll(req,res,next){
        User.find().sort([['username','descending']])
            .then(data=>{
                const takeout = []
                for(let i=0;i<data.length;i++){
                    takeout.push({
                        id: data[i]._id,
                        username: data[i].username,
                        email: data[i].email,
                        role: data[i].role,
                        address: data[i].address
                    })
                }
                res.status(200).json(takeout);
            })
            .catch(err=>{
                next(err);
            })
    }
    static updateForAdmin(req,res,next){
        User.findByIdAndUpdate({
            _id: req.params.id
        },{
            role: req.body.role
        })
            .then(_=>{
                res.status(201).json({msg:"Success Update!"})
            })
            .catch(err=>{
                next(err);
            })
    }
    static register(req,res,next){
        const {username,email,password,address} = req.body
        User.create({username,email,password,address})
            .then((data)=>{
                res.status(201).json({data,msg:"Now we're Family :)"})
            })
            .catch(next)
    }
    static login(req,res,next){
        const {username,password} = req.body;
        User.findOne({username})
            .then(user=>{
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
                        token : serverToken,
                        msg: `Welcome ${username}`,
                        role: user.role
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