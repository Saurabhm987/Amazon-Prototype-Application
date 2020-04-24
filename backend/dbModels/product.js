const mongoose = require('mongoose');
const reviewSchema = require('./review')

const productSchema = new mongoose.Schema({
    seller: [{
        type: Schema.Types.ObjectID,
        name: String,
        required: true
    }],
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
    Images: [{
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
    review: [{
        type: reviewSchema
    }],
    removed: {
        type: Boolean
    }
    
});


module.exports = product = mongoose.model('product', productSchema);
