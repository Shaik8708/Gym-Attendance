const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: {
        required: false,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('gymowner', ownerSchema)