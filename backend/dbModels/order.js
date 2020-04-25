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

const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new mongoose.Schema({
    orderId: { // Not unique
        type: Schema.Types.ObjectID,
        required: true,
    },
    buyerId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    sellerId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    sellerName: {
        type: String,
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
        type: statusHistorySchema,
        required: true
    },
    statusHistory: [statusHistorySchema]    
});


module.exports = order = mongoose.model('order', orderSchema);
