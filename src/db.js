const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const UserModel = mongoose.model('users',UserSchema)
module.exports = {UserModel}