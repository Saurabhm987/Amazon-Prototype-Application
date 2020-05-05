const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const orderServices = require('../services/order');
// const uuid = require('uuid');

// Post /createOrder/newOrder
/**
 * req body:
 * [{
 *  buyerId,
 *  sellerId,
 *  productId,
 *  deliveryAddress: {
 *  street1,
    street2,
    city: ,
    state: ,
    country: ,
    pincode: ,
    phone:,
 *  },
    billingAddress: {
 *  street1,
    street2,
    city: ,
    state: ,
    country: ,
    pincode: ,
    phone:,
 *  },
    paymentDetails: "**** **** 1234",
    totalAmount: (product_price * quantity)
 }]
 * 
 */
router.post('/newOrder', checkAuth, async (req, res) => {
    try {
        const data = {
            "body": req.body,
            "params": req.params,
            "query": req.query,
            "user": req.user
        };
        const response = await orderServices.createNewOrder(data);
        res.status(response.status).json(response.body);
    } catch (error) {
        if (error.message) message = error.message;
        else message = 'Error while adding product to cart';
        if (error.statusCode) code = error.statusCode;
        else code = 500;
        return res.status(code).json({ message });
    }
});

module.exports = router;