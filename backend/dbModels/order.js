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
    name: {
        type: String,
        required: true
    },
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    trackingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
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
        updatedDate: {
            type: Date
        },
        status: {
            type: String
        },
        location: {
            type: String
        }
    }]
}),

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
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
