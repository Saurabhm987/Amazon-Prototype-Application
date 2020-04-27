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
    orderId: { // Not unique - uuid()
        type: Schema.Types.ObjectID,
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
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
    totalAmount: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true,
    },
    orderDate: { // filter by month
        type: Date,
        default: Date.now
    },
    status: {
        type: statusHistorySchema,
        required: true
    },
    statusHistory: [statusHistorySchema]    
});


module.exports = order = mongoose.model('order', orderSchema);
