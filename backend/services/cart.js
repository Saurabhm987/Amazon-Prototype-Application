const express = require('express');
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID= require('mongodb').ObjectID

exports.getProductsFromCart = async (request) => {
    try{
        // console.log(request.params)
        const resp = await buyer.find({ _id: request.params.id }).
        populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1,sellerId:1,sellerName:1  })
        // console.log("a")
        // console.log(resp)  
        return { "status": 200, body: resp[0].cart }
    }
    catch (error) {
        // console.log("b")

        console.log(error)

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
    let resp = null

    try{
////////////////
        const res = await queries.findDocumentsByQuery(buyer, { _id: request.params.customer_id, cart: { $elemMatch: { productId: request.body.product_id } } })
        console.log("a")
        if (res.length) {
            let productindex = 0
            console.log(res[0].cart)
            res[0].cart.forEach((item, index) => {
               
                if ((item.productId).toString() === (request.body.product_id)) {

                    productindex = index
                }
            });
            console.log(productindex)
            update = {
                'cart.$.gift': res[0].cart[productindex].gift,
                'cart.$.quantity': res[0].cart[productindex].quantity + request.body.quantity
            }
            console.log(update)
            resp = await queries.updateField(buyer, { _id: request.params.customer_id, 'cart.productId': request.body.product_id }, update)
        } else {




//////////////////////
        console.log(request.body)
        update =  {$push:{"cart":{
                "productId" : request.body.product_id,
                "gift"    : false,
                "quantity"  : request.body.quantity
            }}}
        console.log(update)
        const resp = await queries.updateField(buyer,{ _id:request.params.customer_id},update)
        console.log(resp)
        }
        return { "status": 200, body: resp.cart }
    
///
}
////
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
        console.log(request.body)
        update = {'cart.$.gift': request.body.gift,
        'cart.$.giftMessage': request.body.giftMessage,
            'cart.$.quantity': request.body.quantity}

            console.log(update)
        let resp = await queries.updateField(buyer,{ _id:request.params.customer_id,'cart.productId':request.params.product_id},update)

        resp = await buyer.findOne({ _id: request.params.customer_id }).
        populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed: 1,sellerId:1,sellerName:1 })
        console.log(resp)
        return { "status": 200, body: resp.cart }
    } 
    catch (error) {
        console.log(error)
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
        resp = await buyer.find({ _id: request.params.customer_id }).
        populate('saveForLater.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed:1,sellerId:1,sellerName:1 }).
        populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed:1,sellerId:1,sellerName:1 })
        return { "status": 200, body: resp[0] }
    // return { "status": 200, body: resp[0].cart }

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