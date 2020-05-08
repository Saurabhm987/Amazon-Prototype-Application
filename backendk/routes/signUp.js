const passport = require('passport'); 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { USER_CUSTOMER, USER_SELLER, USER_ADMIN } = require('../config/types');
const signUpService = require('../services/signUp');
var kafka = require('../kafka/client');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Post /signUp/customer
router.post('/customer', async (req, res) => {    
    try {   
  ///
//   req.type="registerBuyer"
//   await kafka.make_request('signup', req, async (err, data) => {
//     if (err) throw new Error(err)
//     await res.status(data.status).json(data.body);
// });
///

        const response = await signUpService.registerBuyer(req);
        return res.status(response.status).json(response.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }
});

// Post /signUp/seller
// for seller, name param shoould also be unique
router.post('/seller', async (req, res) => {
    try {   

///
req.type="registerSeller"
// await kafka.make_request('signup', req, async (err, data) => {
//   if (err) throw new Error(err)
//   await res.status(data.status).json(data.body);
// });
///

        const response = await signUpService.registerSeller(req);
         //Success, send a jwt token back
        return res.status(response.status).json(response.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }
});

// Post /signUp/admin
router.post('/admin', async (req, res) => {
    try {   

        ///
        // req.type="registerAdmin"
        // await kafka.make_request('signup', req, async (err, data) => {
        // if (err) throw new Error(err)
        // await res.status(data.status).json(data.body);
        // });
        ///

        const response = await signUpService.registerAdmin(req);
         //Success, send a jwt token back
        return res.status(response.status).json(response.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }
});


module.exports = router;

