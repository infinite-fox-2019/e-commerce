const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const User = new Schema({
    username : {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    cart : [
        {   type : Schema.Types.ObjectId ,
            ref : 'product'
        }
    ],
    admin : {
        type : Boolean,
        default : false
    }
})

User.pre('save' , function(next){
    this.password = hash(this.password)
    next()
})

const Model = mongoose.model('user', User)
module.exports = Model