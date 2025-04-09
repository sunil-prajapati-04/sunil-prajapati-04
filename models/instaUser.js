const mongoose = require('mongoose');

const instaUserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        defalut: 0
    },
    following: {
        type: Number,
        default: 0
    },
})


const instaUser  = mongoose.model('instaUser', instaUserSchema);

module.exports = instaUser;