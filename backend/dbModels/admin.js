const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    category: {
        type: String
    },
    
});


module.exports = admin = mongoose.model('admin', adminSchema);
