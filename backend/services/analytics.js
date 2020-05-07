var mongoose = require('mongoose');
const order = require('../dbModels/order');
const product = require('../dbModels/product');
const seller = require('../dbModels/seller');
const buyer = require('../dbModels/buyer');

const { orderStatus } = require('../config/types');
const ObjectID= require('mongodb').ObjectID


exports.getProductsAnalytics = async (req) => {
    try {
        let results = {
            topTenProductsRating: null,
            topTenViewedPerDay: null,
        };

        results.topTenProductsRating = await this.getTopTenProductsRating();
        results.topTenViewedPerDay = await this.getTopTenViewedPerDay();

        results.topTenProductsRating = results.topTenProductsRating.body;
        results.topTenViewedPerDay = results.topTenViewedPerDay.body;
       
        return { "status": 200, body: results };
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

exports.getTopTenProductsRating = async (req) => {
    try {
    let topTenProductsRating =await product.find ().sort( { overallRating: -1 }).limit(10);
        return { "status": 200, body: topTenProductsRating };
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
};
exports.getTopTenViewedPerDay = async (req) => {
    try {
        let topTenProductsViews =await product.find ().sort( { views: -1 }).limit(10);
            return { "status": 200, body: topTenProductsViews };
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
};


//********************************************************************* */

// get first 4 analytics related to sales
exports.getSalesAnalytics = async (req) => {
    try {
        let results = {
            countOrdersPerDay: null,
            topFiveMostSoldProducts: null,
            topFiveSellersAmount: null,
            topFiveCustomerAmount: null,
        };

        results.countOrdersPerDay = await this.getCountOrdersPerDay();
        results.topFiveMostSoldProducts = await this.getTopFiveMostSoldProducts();
        results.topFiveSellersAmount = await this.getTopFiveSellersAmount();
        results.topFiveCustomerAmount = await this.getTopFiveCustomerAmount();

        results.countOrdersPerDay = results.countOrdersPerDay.body;
        results.topFiveMostSoldProducts = results.topFiveMostSoldProducts.body;
        results.topFiveSellersAmount = results.topFiveSellersAmount.body;
        results.topFiveCustomerAmount = results.topFiveCustomerAmount.body;
       
        return { "status": 200, body: results };
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


// No of orders per day.
exports.getCountOrdersPerDay = async (req) => {
    try{
        let countOrdersPerDay = await order.aggregate([
            {
                "$group": { // unique orderId, date pairs
                    _id: {
                        orderId:"$orderId",
                        orderDate:{$dateToString: { format: "%Y-%m-%d", date: "$orderDate" }}
                    },
                    // orderId: {$push: "$orderId"},
                    // orderDate: {$push: "$orderDate"},
                }
            },
            {
                "$group": {
                    _id: "$_id.orderDate",
                    counts:{"$sum": 1},
                    orders: {
                        $push: {
                            "orderId": "$_id.orderId"
                        }
                    }
                }
            }
        ], 
    //    {   // options
    //     allowDiskUse: true
    //    }
       );
       
        return { "status": 200, body: countOrdersPerDay };
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

//  Top 5 most sold products. 
exports.getTopFiveMostSoldProducts = async (req) => {
    try {
        let topFiveMostSoldProducts = await order.aggregate([
            //    {
            //        "$match" : {
            //            "status.status": orderStatus.ORDER_STAT_DELIVERED
            //        }
            //    },
               {
                   "$group": {
                       _id: {productId: "$productId"},
                       counts:{"$sum": "$quantity"},
                   }           
               },
               {
                    $sort: { "counts": -1 }
               },
               {
                    $limit: 5
               }
           ]);
        
           let opts = {path: '_id', select:'_id name' };
           let results = await product.populate(topFiveMostSoldProducts, opts);
       
        return { "status": 200, body: results };
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

// Top 5 sellers based on total sales amount.
exports.getTopFiveSellersAmount = async (req) => {
    try{
        let topFiveSellersAmount = await order.aggregate([
            {
                "$group": {
                    _id: "$sellerId",
                    counts:{"$sum": "$totalAmount"},
                }           
            },
            {
                $sort: { "counts": -1 },
                
            },
            {
                $limit: 5
            }
        ]);
        let opts = {path: '_id', select:'_id name' };
        let results = await seller.populate(topFiveSellersAmount, opts);
        return { "status": 200, body: results };
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

//  Top 5 customers based on total purchase amount.
exports.getTopFiveCustomerAmount = async (req) => {
    try{
        let topFiveCustomerAmount = await order.aggregate([
            {
                "$group": {
                    _id: "$buyerId",
                    counts:{"$sum": "$totalAmount"},
                }           
            },
            {
                $sort: { "counts": -1 }
            },
            {
                $limit: 5
            }
        ]);
        let opts = {path: '_id', select:'_id name' };
        let results = await buyer.populate(topFiveCustomerAmount, opts);
        return { "status": 200, body: results };
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

//////////////////////
exports.sellerstatictics  = async (request) => {
    try{
        let resp = await order.aggregate([
            { "$match": { sellerId: ObjectID(request.user.userId) } },
            {
                "$group": {
                    _id: "$productId",
                    amount:{"$sum": "$totalAmount"},
                    quantity:{"$sum": "$quantity"},
                }           
            }
        ]);
        let opts = {path: '_id', select:'_id name price' };
        let results = await product.populate(resp, opts);
        return { "status": 200, body: results };
    }  catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting statistics';
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500
        return { "status": code, body: { message } }
    }
}
exports.sellermonthlystatictics  = async (request) => {
    try{
        let resp = await order.aggregate([
            { "$match": { sellerId: ObjectID(request.user.userId) } },
            {
                "$group": {
                    _id: {"$month": "$orderDate"},
                    amount:{"$sum": "$totalAmount"}
                }           
            }
        ]);
        return { "status": 200, body: resp };
    }  catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting monthly statistics';
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500
        return { "status": code, body: { message } }
    }
}

exports.staticticsmonthlyseller  = async (request) => {
    try{
        let resp = await order.aggregate([
            { "$match": { sellerId: ObjectID(request.params.sellerId) } },
            {
                "$group": {
                    _id: {"$month": "$orderDate"},
                    amount:{"$sum": "$totalAmount"}
                }           
            }
        ]);
        return { "status": 200, body: resp };
    }  catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting monthly statistics';
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500
        return { "status": code, body: { message } }
    }
}




//////////////////////