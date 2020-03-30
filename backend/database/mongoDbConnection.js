const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var url = process.env.MONGOURI;
var pool; 

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if(err){
        console.log("Mongo Connection err", err);
        return
    }
    pool = db;
    
    console.log("You are connected to MongoDB");
} )

module.exports = pool;
