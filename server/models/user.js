const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {hashPassword} = require("../helpers/bcrypt")

const UserSchema = new Schema({
    email :{type : String, required : [true, "email is required"]},
    password : {type : String, required : [true, "password is required"], minlength:[6, 'password less than 6 characters']},
    role : {type : String, default: 'users'},
    listProducts : [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, { versionKey: false })

UserSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

UserSchema.path('email').validate(function (email) {
    return User.findOne({email})
    .then((data)=>{
        if(data){
            return false
        }else{
            return true
        }
    })
 }, 'Email already taken')

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)
 }, 'Email format is wrong')



const User = mongoose.model('User', UserSchema)




module.exports = User