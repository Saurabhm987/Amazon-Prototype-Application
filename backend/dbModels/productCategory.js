const mongoose = require('mongoose');

const productCatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    numOfProducts: {
        type: Number,
        default: 0,
    }
});


module.exports = productCatagory = mongoose.model('productCategory', productCatSchema);