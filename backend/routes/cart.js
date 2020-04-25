
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const buyer = require('../dbModels/buyer')
const cartServices = require('../services/cart')
router.get('/getCart/:id/cart', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res =await cartServices.getProductsFromCart(data);
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
router.post('/addToCart/:customer_id/cart', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        console.log(data)
        let res =await cartServices.addProductInCart(data);
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
router.put('/updateCart/:customer_id/cart/product/:product_id', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res =await cartServices.updateProductInCart(data);
        response.status(res.status).json(res.body);
    }     
    catch (error) {
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