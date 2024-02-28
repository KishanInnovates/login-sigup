const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://guptakishan428:%4006Guptakishan@cluster0.ytiiwil.mongodb.net/validation");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength:3,
        maxLength: 30
    },
    password: {
        type:String,
        required: true,
        minLength:6
    },
    firstName: {
        type: String,
        required:true,
        trim: true,
        maxLength:20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 20 
    }

});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}