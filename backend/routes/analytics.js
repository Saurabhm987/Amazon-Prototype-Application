const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const product = require('../dbModels/product');
const { orderStatus } = require('../config/types');
const analyticsService = require('../services/analytics');


// GET /analytics/sales
 // response  = {
    //     countOrdersPerDay: [..],
    //     topFiveMostSoldProducts: [..],
    //     topFiveSellersAmount: [..],
    //     topFiveCustomerAmount: [..],
    // };
router.get('/sales', async (req, res) => {
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

// GET /analytics/products
router.get('/products', async (req, res) => {
    try {
        let results = await analyticsService.getProductsAnalytics();
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