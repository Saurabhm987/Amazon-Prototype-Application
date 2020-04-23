var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
    customerId: String,
    customerName: String,
    rating: Number,
    heading: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    }
})

var productSchema = new Schema({
    productName: String,
    seller : {
        sellerId: String,
        sellerName:  String,
    },
    price:Number,
    category: String,
    desription: String,
    images:Array,
    views: Number,
    reviews: [ReviewsSchema]
})

var Product = mongoose.model('product', productSchema);
module.exports = Product;