const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: String,
    },
    rating: {
        type: Number
    },
    header: {
        type: String
    },
    comment: {
        type: String
    }
},
    {
        timestamps: {
            type: Date,
            default: Date.now
        }
    },
)

module.exports = reviewSchema