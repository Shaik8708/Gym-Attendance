const mongoose = require('mongoose');

const gymmerHistory = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    gymmerId: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('gymhistory', gymmerHistory)