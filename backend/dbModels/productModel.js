var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: String,
    productPrice : Number
})

var Product = mongoose.model('product', productSchema);
module.exports = Product;