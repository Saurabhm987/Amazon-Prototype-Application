const mongoose = require('mongoose');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');

exports.createNewOrder = async (req) => {
    try{
        const orderId = mongoose.Types.ObjectId();
        const buyerId = req.user.userId;
        
        const ordersdata = req.body.map((item, index) => {
            item.orderId = orderId;
            item.buyerId = buyerId;
            item.status = {
                status: orderStatus.ORDER_STAT_PLACED,
                updatedAt: Date.now(),
                location: ""
            };
            item.statusHistory = [{
                status: orderStatus.ORDER_STAT_PLACED,
                updatedAt: Date.now(),
                location: ""
            }];            
            return item;
        });
        
        let dbResp = await order.insertMany(ordersdata);
        return { "status": 200, body: dbResp };
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while creating order';
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}