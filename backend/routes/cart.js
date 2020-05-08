
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
// const buyer = require('../dbModels/buyer')
const cartServices = require('../services/cart')
const cachedcart = require('../redis/cachedcart')
const client = require('../index')

// router.get('/getCart/:id', cachedcart, async (request, response, next) => {  
    router.get('/getCart/:id', async (request, response, next) => {  


    try {

        console.log('API CAll .......')

        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }

        let res =await cartServices.getProductsFromCart(data);

        console.log('res - ', res)

        const {id} = request.params
        // client.set(`"cart-${id}"`,JSON.stringify(item))

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

router.post('/addToCart/:customer_id', async (request, response) => {  
    try {
        console.log('API CALL..........')
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }

        let res =await cartServices.addProductInCart(data);

        const{ customer_id } = request.params

        client.set(`"cart-${customer_id}"`, JSON.stringify(res.body))

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
router.put('/updateCart/:customer_id/product/:product_id', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res =await cartServices.updateProductInCart(data);

        const {customer_id} = request.params
        client.set(`"cart-${customer_id}"`, JSON.stringify(res.body))
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



router.delete('/deleteCart/:customer_id/product/:product_id/:type', async (request, response) => {  
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "deleteProductInCart"
        }
       
        let res =await cartServices.deleteProductInCart(data);

        // const {customer_id} = request.params
        // client.set(`"cart-${customer_id}"`, JSON.stringify(res.body))

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