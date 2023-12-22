const mongoose = require('mongoose');

const gymUserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    dob: {
        required: false,
        type: Date
    },
    address: {
        required: false,
        type: String
    },
    gender: {
        required: false,
        type: String
    },
    membershipStart: {
        required: true,
        type: Date
    },
    membershipEnd: {
        required: true,
        type: Date
    },
    isSubscribed: {
        required: false,
        type: Boolean
    },

    gymmerId:{
        required: false,
        type: String
    }
    // name: String,
    // phone: Number,
    // email: String,
    // age: Number,
    // dob: Date,
    // gender: String,
    // address: String,
    // membershipStart: Date,
    // membershipEnd: Date,
    // isSubscribe: Boolean,
    
})

module.exports = mongoose.model('gymuser', gymUserSchema)