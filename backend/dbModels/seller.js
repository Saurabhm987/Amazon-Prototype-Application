const mongoose = require('mongoose');
const cardSchema = require('./card')
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

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: null
    },
    address: {
        type: addressSchema,
        default: null
    },
    products: [{
        id:{type:  mongoose.Schema.Types.ObjectId, ref:'product'}
    }],
    orders: [{
        id:{type:  mongoose.Schema.Types.ObjectId, ref:'order'}
    }]
});

sellerSchema.plugin(uniqueValidator);

module.exports = seller = mongoose.model('seller', sellerSchema);
