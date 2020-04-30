const mongoose = require('mongoose');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const {findDocumets,updateField}= require('../queries/mongoQueries');
const {USER_CUSTOMER,USER_SELLER} = require('../config/types');


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

exports.updateOrderStatus= async (data)=>{


    try{
        const findQuery ={orderId: mongoose.Types.ObjectId(data.orderId),
            productId: mongoose.Types.ObjectId(data.productId)};
        const updatedStatus = data.updatedStatus;

        let currentOrder= await findDocumets(order,findQuery);
        //console.log("currentOrder :: ",currentOrder);

        /*
        Step 1
        update the status history
        */
        const statusHistory= currentOrder[0].statusHistory;
        const currentStatus=currentOrder[0].status;
        //console.log("status hostory status:: ",statusHistory);
        const updatedHistoryQuery = {
            $push:
                {
                    statusHistory:currentStatus
                }
        }
        let updatedOrderStatusHistory= await updateField(order, findQuery, updatedHistoryQuery);

        //console.log("updatedOrderStatusHistory ::",updatedOrderStatusHistory);
        /*
        Step 2
        update the status
        */
        const updateStatusQuery = {
            $set:
                {
                    "status.status":updatedStatus
                }
        }
        let updatedOrderStatus= await updateField(order, findQuery, updateStatusQuery);
        //console.log("updatedOrderStatus ::",updatedOrderStatus);
        return updatedOrderStatus;
    }
    catch (error) {
        //console.log("error caught in service ::::::::::::::::",error);
        throw error;
    }

}

exports.getUserOrders= async (data)=>{
        console.log("data getUserOrders service", data);
        const userId=mongoose.Types.ObjectId(data.userId);
    try{
        if(data.userType===USER_CUSTOMER){

            console.log("finding customer oder ", userId);
            const findQuery={buyerId:userId};
            return await findDocumets(order, findQuery);
        }
        else if(data.userType===USER_SELLER){
            console.log("finding seller oder ",userId);
            const findQuery={sellerId:userId};
            return await findDocumets(order, findQuery);
        }
        else{
            throw new Error("User is not authenticated for this information");
        }
    }
    catch (error) {
        //console.log("error caught in service ::::::::::::::::",error);
        throw error;
    }

}
