const mongoose = require('mongoose');

const cardDetailSchema = new mongoose.Schema({
    // cardType: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    }
    
    
});


module.exports =  cardDetailSchema;
