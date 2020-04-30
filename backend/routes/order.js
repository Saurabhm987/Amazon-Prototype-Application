const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const orderServices = require('../services/order');
const {updateOrderStatus} = require ('../services/order');

//updates the status per order per product
router.put('/updateStatus',async (req,res)=>{

    try{
        const data = {
            orderId:req.body.orderId,
            productId:req.body.productId,
            updatedStatus:req.body.updatedStatus
        }
        let result = await updateOrderStatus(data);
        res.status(200).json(result);
    }
    catch (error) {
        let message="";
        let code="";
        if (error.message)
            message = error.message;
        else
            message = 'Error while fetching orders';

        if (error.statusCode)
            code = error.statusCode;
        else
            code = 500;

        return res.status(code).json({ message });
    }
});

module.exports = router;