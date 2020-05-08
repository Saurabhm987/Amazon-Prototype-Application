const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const product = require('../dbModels/product');
const { orderStatus } = require('../config/types');
const analyticsService = require('../services/analytics');
var kafka = require('../kafka/client');


// GET /analytics/sales
 // response  = {
    //     countOrdersPerDay: [..],
    //     topFiveMostSoldProducts: [..],
    //     topFiveSellersAmount: [..],
    //     topFiveCustomerAmount: [..],
    // };
router.get('/sales', async (req, res) => {
    try {
        const data = {
            "type":"getSalesAnalytics"
        }
         ///
         await kafka.make_request('analytics', data, async (err, data) => {
            if (err) throw new Error(err)
            await res.status(data.status).json(data.body);
        });
        ///
        // let results = await analyticsService.getSalesAnalytics(data);
        // res.status(results.status).json(results.body);
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
        const data = {
            "type":"getProductAnalytics"
        }
        ///
        await kafka.make_request('analytics', data, async (err, data) => {
            if (err) throw new Error(err)
            await res.status(data.status).json(data.body);
        });
        ///
        // let results = await analyticsService.getProductsAnalytics(data);
        // res.status(results.status).json(results.body);
    } catch(error) {
        if (error.message) message = error.message;
        else message = 'Error while adding product to cart';
        if (error.statusCode) code = error.statusCode;
        else code = 500;
        return res.status(code).json({ message });
    }

});

///////////////////////

router.get('/sellerstatictics',checkAuth, async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type":"getSellerStatistics"
        }
        ///
        await kafka.make_request('analytics', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await analyticsService.sellerstatictics(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});

router.get('/staticticsmonthlyseller/:sellerId', async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type":"getSellerMonthlyStatistics"
        }
         ///
         await kafka.make_request('analytics', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await analyticsService.staticticsmonthlyseller(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});




router.get('/sellermonthlystatictics',checkAuth, async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type":"getSellerMonthlyStatisticsById"
        }
         ///
         await kafka.make_request('analytics', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await analyticsService.sellermonthlystatictics(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});


//////////////////////
module.exports = router;