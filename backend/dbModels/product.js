const mongoose = require('mongoose');
const reviewSchema = require('./review')

const productSchema = new mongoose.Schema({
    seller: {
        _id: String,
        name: String,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    overallRating: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    quantity: {
        type: Number,
        required: true
    },
    giftPrice: {
        type: Number,
        required: true
    },
    views:{
        type: Number
    },
    review: [{
        type: reviewSchema
    }],
    removed: {
        type: Boolean, default: false
    }
    
});


module.exports = product = mongoose.model('product', productSchema);
