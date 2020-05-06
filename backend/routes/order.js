const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const orderServices = require('../services/order');
const {updateOrderStatus,getUserOrders,paginatedResults} = require ('../services/order');

//updates the status per order per product
// todo add checkAuth,
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

/*
order/getOrder/:userId
* */
//params: usrID
//query : ?page=x&limit=y
//:{userID}

router.get('/getUserOrder', checkAuth, async(req,res)=>{ // todo add checkAuth,
    //console.log("req.query", req.query);
    //console.log("req.params", req.params);
    console.log('hiting....!!!!')
    try{
        const data = {
            userId: req.user.userId, //{ userID: '1123' }
            "query": req.query, // { page: '1', limit: '12' }
            userType:req.user.userType} //"customer"

            console.log('data---', data)
        let resOrder =await getUserOrders(data);
        res.status(200).json(resOrder);
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching orders'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return res.status(code).json({ message });
    }

});

//?page=page&limit=limit
router.get('/getAllOrders/',paginatedResults(order),(req,res)=>{ // todo add checkAuth
    //console.log("req.query", req.query);
    //console.log("req.params", req.params);//?page=x&limit=y
    //console.log("res.paginatedResults ",res.paginatedResults);
    res.json(res.paginatedResults);
});

module.exports = router;