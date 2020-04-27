const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    rating: {
        type: Number
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
    }
)

module.exports = reviewSchema