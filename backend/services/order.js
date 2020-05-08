const mongoose = require('mongoose');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const {findDocumets,updateField,countDocumentsByQuery,findDocumentsByQueryFilter}= require('../queries/mongoQueries');
const {USER_CUSTOMER,USER_SELLER} = require('../config/types');
const ObjectID= require('mongodb').ObjectID

exports.paginatedResults = (model,data)=>{
    return async (req, res, next) => {
        const data = {
            pageNum: req.query.page,
            limit: req.query.limit
        }
        const page = parseInt(data.pageNum);
        const limit = parseInt(data.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        try {
            if (endIndex < await countDocumentsByQuery(order)) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            };
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            };
            const filter={
                            skip:startIndex,
                            limit:limit
                        };

            //console.log("filter to be sent to query in pagianted funcion", filter);
            // results.results = await findDocumentsByQueryFilter(order,...Array(2),filter);
           
            results.results= await order.find().lean().skip(filter.skip).limit(filter.limit)
            .populate('productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1 })
            .populate('buyerId', { name: 1})
            .populate('sellerId', { name: 1})
            res.paginatedResults = results

            //console.log("res pagiintaed resutls ",res.paginatedResults);
            next();
        } catch (error) {
            throw error;
        }
    }
  };

exports.createNewOrder = async (req) => {
    try{
        const orderId = mongoose.Types.ObjectId();
        const buyerId = req.user.userId;
        console.log(req);
        
        const ordersdata = req.body.map((item, index) => {
            item.orderId = orderId;
            item.buyerId = buyerId;
            item.status = {
                status: orderStatus.ORDER_STAT_PLACED,
                // updatedAt: Date.now(),
                location: ""
            };
            item.statusHistory = [{
                status: orderStatus.ORDER_STAT_PLACED,
                // updatedAt: Date.now(),
                location: ""
            }];            
            return item;
        });
        console.log(ordersdata)
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
            const findQuery={buyerId:ObjectID(data.userId)};
            
            return await order.find(findQuery).sort({ orderDate : -1 } )
            .populate('productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1 })
            .populate('buyerId', { name: 1})
            .populate('sellerId', { name: 1})


            // return await findDocumets(order, findQuery);

            // let resp = await order.aggregate([
            //     { "$match": { buyerId:ObjectID(data.userId) } },
            //     {
            //         "$group": {
            //             _id: "$orderId",
            //             products: { $push: '$productId' },
            //             seller: { $push: '$sellerId' },
            //             totalAmount: { $push: '$totalAmount' },
            //             quantity: { $push: '$quantity' },

            //             deliveryAddress : { $first: '$deliveryAddress' },

            //             paymentDetails : { $first: '$paymentDetails' },
            //             billingAddress : { $first: '$billingAddress' }
 
            //         }           
            //     }
            // ]);

            // let opts = {path: 'productId', select:'_id name price' };
            // let results = await product.populate(resp, opts);
            // return { "status": 200, body: response };

        }
        else if(data.userType===USER_SELLER){
            console.log("finding seller oder ",userId);
            const findQuery={sellerId:userId};
            // return await findDocumets(order, findQuery);
            return await order.find(findQuery).sort({ orderDate : -1 } ).populate('productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1 })
            .populate('buyerId', { name: 1})
            .populate('sellerId', { name: 1})

            // return { "status": 200, body: response };

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
