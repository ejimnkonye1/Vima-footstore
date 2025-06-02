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
      phoneNumber: {
        type: String,
        required: false,
    },
    refreshToken : String
 },
{  timestamps: true}
);

 module.exports = mongoose.model("User", userSchema)