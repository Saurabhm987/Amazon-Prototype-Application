const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose')
require('./database/mySqlConnection')
require('./config/passport');
const morgan = require('morgan');

const mongoPool = require('./database/mongoDbConnection')
const mysqlPool = require('./database/mySqlConnection')
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static(path.join(__dirname, '/public'))); // specify the path of static directory
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/public', express.static('public'));


// mongo and mysql connection pool
mongoPool
mysqlPool

// route handlers
app.use('/product', require('./routes/products'))
app.use('/user', require('./routes/cart'))
app.use('/saveForLater', require('./routes/saveForLater'))

// app.use('/product', require('./routes/apicontroller/products'))
app.use('/signUp', require('./routes/signUp'));
app.use('/signin', require('./routes/signin'));

// app.use('/customer', require('./routes/cart'))
app.listen(3001);
console.log("Server Listening on port 3001")
module.exports = app;
