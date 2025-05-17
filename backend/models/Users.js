 const  mongoose = require("mongoose")
 const Schema = mongoose.Schema

 const userSchema =  new Schema({
     email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        type: [String],  // Array of strings
    default: ['user']
       
    },
    password: {
        type: String,
        required: true
    },
    refreshToken : String
 });

 module.exports = mongoose.model("User", userSchema)