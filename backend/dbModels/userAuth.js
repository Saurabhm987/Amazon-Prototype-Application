const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

// to add current date
// date: {
    // type: Date,
    // default: Date.now
// }

module.exports = userAuth = mongoose.model('userAuth', userAuthSchema);
