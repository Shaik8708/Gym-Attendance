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
        type: Number
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
        type: Number
    },
    membershipEnd: {
        required: true,
        type: Number
    },
    isSubscribed: {
        required: false,
        type: Boolean
    },

    gymmerId:{
        required: false,
        type: String
    }
})

module.exports = mongoose.model('gymuser', gymUserSchema)