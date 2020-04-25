const mongoose = require('mongoose');
const cardSchema = required('./card')

const deliveryAddress = new mongoose.Schema({
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

}),

const billingAddress = new mongoose.Schema({
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

}),

productSchema = new mongoose.Schema ({
    productId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    trackingId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    sellerId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    update: [{

    }]
}),

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    deliveryAddress: {
        type: deliveryAddress,
        required: true
    },
    billingAddress: {
        type: billingAddress,
        required: true
    },
    product: {
        type: productSchema,
        required: true
    },
    paymentDetails: {
        type: cardSchema
    },
    orderTotal: {
        type: Number
    },
    orderDate: {
        type: Date
    },
    status: {
        type: String
    },
    
});


module.exports = order = mongoose.model('order', orderSchema);
