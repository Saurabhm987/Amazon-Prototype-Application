const mongoose = require('mongoose');
const cardSchema = require('./card');
const reviewSchema = require('./review');
const uniqueValidator = require('mongoose-unique-validator');


const addressSchema = new mongoose.Schema({
    street1: {
        type: String,
        required: true
    },
    street2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

});

const commentSchema = new mongoose.Schema ({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product" 
    },
    review: {
        type: reviewSchema,
        required: true
    },
});

const cartSchema = new mongoose.Schema ({
    productId: 
    {   type: mongoose.Schema.Types.ObjectId, 
        ref: "product" 
    },

    quantity: {
        type: Number,
        required: true
    },
    gift: {
        type: Boolean
    }
    ,
    giftMessage: {
        type: String
    }
});

const saveForLaterSchema = new mongoose.Schema ({
    productId: 
    {   type: mongoose.Schema.Types.ObjectId, 
        ref: "product"
    }
   
});


const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default:null
    },
    comments: [{
        type: commentSchema
    }],
    address: [{
        type: addressSchema
    }],
    card: [{
        type: cardSchema
    }],
    cart: [{
        type: cartSchema
    }],

    saveForLater: [{
        type: saveForLaterSchema
    }],
    // orders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    // }]
});

buyerSchema.plugin(uniqueValidator);
module.exports = buyer = mongoose.model('buyer', buyerSchema);
