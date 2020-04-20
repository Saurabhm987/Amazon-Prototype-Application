const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');
require('./database/mySqlConnection')
require('./config/passport');

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
app.use(bodyParser.json());
app.use(passport.initialize());

// mongo and mysql connection pool
mongoPool
mysqlPool

// route handlers
require('./routes/signUp')(app);

app.listen(3001);
console.log("Server Listening on port 3001")
module.exports = app;
