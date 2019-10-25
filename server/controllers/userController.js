const User = require('../models/user.js');
const {signToken} = require('../helpers/jwt');
const {comparePassword} = require('../helpers/password');
const {sendMail} = require('../helpers/sendMail');
const { OAuth2Client } = require('google-auth-library')

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
        if(req.body.role == 'Customer'){
            User.findByIdAndUpdate({
                _id: req.params.id
            },{
                role: 'Admin'
            })
                .then(_=>{
                    res.status(201).json({msg:"Success Update!"})
                })
                .catch(err=>{
                    next(err);
                })
        }else{
            User.findByIdAndUpdate({
                _id: req.params.id
            },{
                role: 'Customer'
            })
                .then(_=>{
                    res.status(201).json({msg:"Success Update!"})
                })
                .catch(err=>{
                    next(err);
                })
        }
    }
    static delete(req,res,next){
        const id = req.params.id
        User.deleteOne({_id:id})
            .then(()=>{
                res.status(200).json({msg: "success Delete"})
            })
            .catch(err=>{
                next(err)
            })
    }
    static register(req,res,next){
        const {username,email,password,address} = req.body
        User.create({username,email,password,address})
            .then((data)=>{
                sendMail(email,{
                    msg : 
`Welcome, now your email has been automatically registered in our database ..
your current data:
username: ${username}
address: ${address}
please remember your username and password :)
for more information you can reply to this email thank you
NB: This message is automatically answered`
                })
                res.status(201).json({data,msg:"Now we're Family!"})
            })
            .catch(next)
    }
    static login(req,res,next){
        const {email,password} = req.body;
        User.findOne({email})
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
                        msg: `Welcome ${user.username}`,
                        role: user.role
                    })
                }else{
                    throw error
                }
            })
            .catch(err=>{
                next(err)
            })
    }
    static findOne(req,res,next){
        const id = req.loggedUser._id;
        User.findById({_id: id})
            .then(user=>{
                res.status(200).json(user);
            })
            .catch(err=>{
                next({status:404,msg:'Not Found'});
            })
    }
}


module.exports = UserController;