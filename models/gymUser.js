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
        required: true,
        type: Boolean
    },
    
})

module.exports = mongoose.model('Gymmer', gymUserSchema)