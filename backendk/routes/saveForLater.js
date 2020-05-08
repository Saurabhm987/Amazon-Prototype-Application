
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
// const buyer = require('../dbModels/buyer')
const saveForLaterServices = require('../services/saveForLater')
var kafka = require('../kafka/client');


router.get('/getSaveForLater/:id', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type":"getSaveforlater"
        }
         ///
         await kafka.make_request('cart-saveforlater', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res =await saveForLaterServices.getProductsFromSaveForLater(data);
        // response.status(res.status).json(res.body);     
    }  
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting products from cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});
router.post('/addToSaveForLater/:customer_id', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type":"addSaveforlater"
        }
        console.log(data)

         ///
         await kafka.make_request('cart-saveforlater', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        // let res =await saveForLaterServices.addProductInSaveForLater(data);
        // response.status(res.status).json(res.body);
    }  
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding product to cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



router.delete('/deleteSaveForLater/:customer_id/product/:product_id/:type', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type":"deleteSaveforlater"
        }

         ///
         await kafka.make_request('cart-saveforlater', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        // let res =await saveForLaterServices.deleteProductInSaveForLater(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});


module.exports = router