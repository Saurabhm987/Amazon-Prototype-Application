const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const buyerProfileService  = require ('../services/buyerProfile');

// !! not implemented
router.get('/', checkAuth, async (req, res) => {
    try {
        const data = {
            "body": req.body,
            "params": req.params,
            "query": req.query,
        }
        let response = await buyerProfileService.getBuyerProfile(data);
        res.status(response.status).json(response.body);     

    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting address details'
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500
        return response.status(code).json({ message });
    }
});

module.exports = router;
