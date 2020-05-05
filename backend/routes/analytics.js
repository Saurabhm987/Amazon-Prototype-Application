const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const product = require('../dbModels/product');
const { orderStatus } = require('../config/types');
const analyticsService = require('../services/analytics');

router.get('/sales', async (req, res) => {
    // let results = {
    //     countOrdersPerDay: null,
    //     topFiveMostSoldProducts: null,
    //     topFiveSellersAmount: null,
    //     topFiveCustomerAmount: null,
    // };

    try {
   let results = await analyticsService.getSalesAnalytics();
   res.status(results.status).json(results.body);
    } catch(error) {
        if (error.message) message = error.message;
        else message = 'Error while adding product to cart';
        if (error.statusCode) code = error.statusCode;
        else code = 500;
        return res.status(code).json({ message });
    }
    

});


module.exports = router;