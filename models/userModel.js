// const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024

    }
});

module.exports =mongoose.model('userModel', userSchema);

// const User = model('userModel',userSchema);

// module.exports.User=User;