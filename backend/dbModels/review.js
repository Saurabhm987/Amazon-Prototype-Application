const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectID,
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