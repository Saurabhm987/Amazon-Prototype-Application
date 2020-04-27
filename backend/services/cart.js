const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID= require('mongodb').ObjectID

exports.getProductsFromCart = async (request) => {
    try{
        console.log(request.params)
        const resp = await buyer.find({ _id: request.params.id }).
        populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1 })
        return { "status": 200, body: resp[0].cart }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching products from cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}
exports.addProductInCart = async (request) => {
    try{
        console.log(request.body)
        update =  {$push:{"cart":{
                "productId" : request.body.product_id,
                "gift"    : request.body.gift,
                "giftMessage"    : request.body.giftMessage,
                "quantity"  : request.body.quantity
            }}}
        console.log(update)
        const resp = await queries.updateField(buyer,{ _id:request.params.customer_id},update)
        console.log(resp)
        return { "status": 200, body: resp.cart }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding into cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}
exports.updateProductInCart = async (request) => {
    try{
        console.log(request.params)
        update = {'cart.$.gift': request.body.gift,
        'cart.$.giftMessage': request.body.giftMessage,
            'cart.$.quantity': request.body.quantity}
        const resp = await queries.updateField(buyer,{ _id:request.params.customer_id,'cart.productId':request.params.product_id},update)
        return { "status": 200, body: resp.cart }
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

        return { "status": code, body: { message } }
    }
}


exports.deleteProductInCart = async (request) => {
    try {
        console.log(request.params)
        update = {
            $pull: {
                "cart": {
                    "productId": request.params.product_id
                }
            }
        }
        let resp = await queries.updateField(buyer, { _id: request.params.customer_id }, update)

        resp = await buyer.find({ _id: request.params.customer_id }).
            populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed:1  })
        if(request.params.type === 'saveforlater'){
            console.log(request.params.type)
            console.log(request.params.customer_id)
            console.log(request.params.product_id)
            updatesave =  {$push:{"saveForLater":{
                "productId" : request.params.product_id
            }}}
        console.log(updatesave)
        const save = await queries.updateField(buyer,{ _id:request.params.customer_id},updatesave)
        console.log(save)

        }
        return { "status": 200, body: resp[0].cart }
    }    
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}