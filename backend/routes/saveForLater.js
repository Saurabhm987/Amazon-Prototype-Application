
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
// const buyer = require('../dbModels/buyer')
const saveForLaterServices = require('../services/saveForLater')


router.get('/getSaveForLater/:id', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res =await saveForLaterServices.getProductsFromSaveForLater(data);
        response.status(res.status).json(res.body);     
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
        }
        console.log(data)
        let res =await saveForLaterServices.addProductInSaveForLater(data);
        response.status(res.status).json(res.body);
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
            "type": "deleteProductInSaveForLater"
        }
      
        let res =await saveForLaterServices.deleteProductInSaveForLater(data);
        response.status(res.status).json(res.body);
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