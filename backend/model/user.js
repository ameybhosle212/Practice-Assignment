const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password1:{
        type:String,
        required:true
    },
    passwordEncrypted:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    }
})

const model = new mongoose.model('User',schema);

module.exports = model;