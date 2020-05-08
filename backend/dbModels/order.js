const mongoose = require('mongoose');
const cardSchema = require('./card');

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

});

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
});

// productSchema = new mongoose.Schema ({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//     },
//     trackingId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//     },
//     sellerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     update: [{
//         updatedDate: {
//             type: Date
//         },
//         status: {
//             type: String
//         },
//         location: {
//             type: String
//         }
//     }]
// });

const statusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    timestamps: { //to get updated timestamp for each update
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    }
});

const orderSchema = new mongoose.Schema({
    orderId: { // Not unique - uuid()
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer',
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    deliveryAddress: {
        type: deliveryAddress,
        required: true
    },
    paymentDetails: {
        type: String
    },
    billingAddress: {
        type: billingAddress,
        required: true
    },
    
    totalAmount: {
        type: Number
    },
    gift: {
        type: Boolean
    }
    ,
    giftMessage: {
        type: String
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
        type: statusSchema,
        required: true
    },
    gift: {
        type : Boolean
    },
    giftMessage: {
        type : String
    },
    statusHistory: [statusSchema]    
});


module.exports = order = mongoose.model('order', orderSchema);
