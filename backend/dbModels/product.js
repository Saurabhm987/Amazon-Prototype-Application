const mongoose = require('mongoose');
const reviewSchema = require('./review')

const productSchema = new mongoose.Schema({
    sellerName:{
        type:String
    },
    sellerId:{
        type:String
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
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    quantity: {
        type: Number,
        required: true
    },
    views:{
        type: Number
    },
    viewData: {
        type: Date,
    },
    review: [{
        _id: false,
        type: reviewSchema
    }],
    removed: {
        type: Boolean, default: false
    }
    
});


module.exports = product = mongoose.model('product', productSchema);
