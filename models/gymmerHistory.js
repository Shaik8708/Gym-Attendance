const mongoose = require('mongoose');

const gymmerHistory = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    gymmerId: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('gymhistory', gymmerHistory)