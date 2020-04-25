const mongoose = require('mongoose');
const cardSchema = required('./card')
<<<<<<< Updated upstream
=======
const uniqueValidator = require('mongoose-unique-validator');

>>>>>>> Stashed changes

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

}),

const commentSchema = new mongoose.Schema ({
    productId: {
<<<<<<< Updated upstream
        type: Schema.Types.ObjectID,
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectID,
=======
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },
    
    commentId: {
        type: mongoose.Schema.Types.ObjectID,
>>>>>>> Stashed changes
        required: true
    },
}),

const cartSchema = new mongoose.Schema ({
<<<<<<< Updated upstream
    productId: {
        type: Schema.Types.ObjectID,
        required: true
    },
=======
    productId: 
    {   type: mongoose.Schema.Types.ObjectId, 
        ref: "products" 
    },

>>>>>>> Stashed changes
    quantity: {
        type: Number,
        required: true
    },
    gift: {
        type: Boolean
    },
    giftMessage: {
        type: String
    }
}),

const saveForLaterSchema = new mongoose.Schema ({
<<<<<<< Updated upstream
    productId: {
        type: Schema.Types.ObjectID,
        required: true
    },
=======
    productId: 
    {   type: mongoose.Schema.Types.ObjectId, 
        ref: "products"
    },

>>>>>>> Stashed changes
    SavedQuantity: {
        type: Number,
        required: true
    },
}),

const buyerSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comments: [{
        type: commentSchema
    }],
<<<<<<< Updated upstream
    address: {
        type: addressSchema,
        required: true
    },
    card: {
        type: cardSchema
    },
=======
    address: [{
        type: addressSchema,
        required: true
    }],
    card: [{
        type: cardSchema
    }],
>>>>>>> Stashed changes
    cart: [{
        type: cartSchema
    }],
    saveForLater: [{
        type: saveForLaterSchema
    }],
    orders: [{
<<<<<<< Updated upstream
        type: Schema.Types.ObjectID,
    }]
});


module.exports = buyer = mongoose.model('buyer', buyerSchema);
=======
        type: mongoose.Schema.Types.ObjectID,
    }]
});

buyerSchema.plugin(uniqueValidator);
module.exports = buyer = mongoose.model('buyer', buyerSchema);
>>>>>>> Stashed changes
