const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const checkAuth = require('../config/passport');
const order = require('../dbModels/order');
const { orderStatus } = require('../config/types');
const orderServices = require('../services/order');

router.get('/sales', async (req, res) => {
    let results = {
        countOrdersPerDay: null,
        topFiveMostSoldProducts: null,
        topFiveSellersAmount: null,
        topFiveCustomerAmount: null,
    };

    try {
        // No of orders per day.
    let countOrdersPerDay = await order.aggregate([
        // {
        //     "$group": { 
        //         _id: {  "orderDate":{$dateToString: { format: "%Y-%m-%d", date: "$orderDate" }}},
        //     }
        // },
        {
            "$group": { 
                _id: {
                    orderId:"$orderId",
                    "orderDate":{$dateToString: { format: "%Y-%m-%d", date: "$orderDate" }}
                },
                counts:{"$sum": 1},
                orderId: {$push: "$orderId"},
                orderDate: {$push: "$orderDate"},
            }
        }
    ], 
   );
//    let countOrdersPerDay = await order.aggregate([
//     {
//         "$group": {
//             _id: {  orderId:"$orderId" },
//             orders: {$push: "$$ROOT"}
//         }
//     }
//     ]);
//     {
//         "$group": { 
//             _id: { 
//                 "orderDate":{$dateToString: { format: "%Y-%m-%d", date: "$orderDate" }},
//                 // orderId:"$orderId",
//             }
//         }
//     },
//     { "$project": { } }
// ], 
// );
//    {   // options
//     allowDiskUse: true
// }

    res.status(200).json(countOrdersPerDay);

    //  Top 5 most sold products.
    // Top 5 sellers based on total sales amount.
    //  Top 5 customers based on total purchase amount.

    } catch(error) {
        if (error.message) message = error.message;
        else message = 'Error while adding product to cart';
        if (error.statusCode) code = error.statusCode;
        else code = 500;
        return res.status(code).json({ message });
    }
    

});


module.exports = router;