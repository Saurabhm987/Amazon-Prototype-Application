const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var url = process.env.MONGO_URI;
var pool; 

var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(url, options, (err, db) => {
    if(err){
        console.log("Mongo Connection err", err);
        return
    }
    pool = db;
    console.log("You are connected to MongoDB");
} )

module.exports = pool;
