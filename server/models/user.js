const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const {hashPassword} = require('../helpers/password');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: String,
    address: {
        type: String,
        required: true
    }
})

UserSchema.pre('save',function(next){
    this.password = hashPassword(this.password);
    this.role = 'Customer';
    next()
})

const User = Mongoose.model('Users',UserSchema);

User.createCollection()
    .then(_=>{
        console.log(`Success Created User Collection`)
    })
    .catch(console.log)

module.exports = User;