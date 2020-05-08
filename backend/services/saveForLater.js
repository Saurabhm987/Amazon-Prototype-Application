const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID= require('mongodb').ObjectID

exports.getProductsFromSaveForLater = async (request) => {
    try{
        console.log(request.params)
        const resp = await buyer.find({ _id: request.params.id }).
        populate('saveForLater.productId', { name: 1, price: 1, _id: 1, images: 1, description:1, removed:1,sellerId:1,sellerName:1  })
        console.log(resp)
        return { "status": 200, body: resp[0].saveForLater }
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
exports.addProductInSaveForLater = async (request) => {
    try{

//////////////////////////
        const res = await queries.findDocumentsByQuery(buyer, { _id: request.params.customer_id, saveForLater: { $elemMatch: { productId: request.body.product_id } } })
        console.log("a")
        if (res.length) {
            return { "status": 200, body: res[0].saveForLater }

            // let productindex = 0
            // console.log(res[0].saveForLater)
            // res[0].saveForLater.forEach((item, index) => {
            
            //     if ((item.productId).toString() === (request.body.product_id)) {

            //         productindex = index
            //     }
            // });
            // console.log(productindex)
            // update = {
            //     'cart.$.gift': res[0].cart[productindex].gift,
            //     'cart.$.quantity': res[0].cart[productindex].quantity + request.body.quantity
            // }
            // console.log(update)
            // resp = await queries.updateField(buyer, { _id: request.params.customer_id, 'cart.productId': request.body.product_id }, update)
        } else {



////////////////////////////
        console.log("addddd")
        console.log(request.body)
        update =  {$push:{"saveForLater":{
                "productId" : request.body.product_id
                // ,
                // "SavedQuantity"  : request.body.savedQuantity
            }}}
        console.log(update)
        const resp = await queries.updateField(buyer,{ _id:request.params.customer_id},update)
        console.log(resp)
        }
        return { "status": 200, body: resp.saveForLater }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding into save for later'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}



exports.deleteProductInSaveForLater = async (request) => {
    try {
        console.log(request.params)
        update = {
            $pull: {
                "saveForLater": {
                    "productId": request.params.product_id
                }
            }
        }
        let resp = await queries.updateField(buyer, { _id: request.params.customer_id }, update)

      
        if(request.params.type === 'movetocart'){
            console.log(request.params.type)
            console.log(request.params.customer_id)
            console.log(request.params.product_id)
            updatesave =  {$push:{"cart":{
                "productId" : request.params.product_id,
                "quantity"  : 1
            }}}
        console.log(updatesave)
        const save = await queries.updateField(buyer,{ _id:request.params.customer_id},updatesave)
        console.log(save)
      
        }
        resp = await buyer.find({ _id: request.params.customer_id }).
        populate('saveForLater.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed:1 ,sellerId:1,sellerName:1   }).
        populate('cart.productId', { name: 1, price: 1, _id: 1, images: 1, description: 1, removed:1,sellerId:1,sellerName:1   })

        console.log(resp[0])
        // return { "status": 200, body: resp[0].saveForLater }
        return { "status": 200, body: resp[0] }

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