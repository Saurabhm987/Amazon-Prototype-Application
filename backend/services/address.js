const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID= require('mongodb').ObjectID

exports.getAddress = async (request) => {
    try{
        console.log(request.params)
        console.log("aaa")
        const resp = await buyer.findOne({_id: request.params.id })
        console.log(resp)
        return { "status": 200, body: resp.address }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching address details'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}


exports.addAddress = async (request) => {
    try{
        console.log(request.body)
        update =  {$push:{"address":{
                "street1" : request.body.street1,
                "street2" : request.body.street2,
                "city" : request.body.city,
                "state" : request.body.state,
                "country": request.body.country,
                "pincode": request.body.pincode,
                "phone": request.body.phone
            }}}
        console.log(update)
        const resp = await queries.updateField(buyer,{ _id:request.params.customer_id},update)
        console.log(resp)
        return { "status": 200, body: resp.address }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding address details'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

exports.updateAddress = async (request) => {
    try{
        console.log(request.params)
        update = {
            'address.$.street1' : request.body.street1,
            'address.$.street2' : request.body.street2,
            'address.$.city' : request.body.city,
            'address.$.state' : request.body.state,
            'address.$.country': request.body.country,
            'address.$.pincode': request.body.pincode,
            'address.$.phone': request.body.phone
        }
        let resp = await queries.updateField(buyer,{ _id:request.params.customer_id,'address._id':request.params.id},update)
        resp = await buyer.findOne({ _id: request.params.customer_id })
        console.log(resp)
        return { "status": 200, body: resp.address }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating address details'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}


exports.deleteAddress = async (request) => {
    try {
        console.log(request.params)
        update = {
            $pull: {
                "address" : {
                    "_id": request.params.address_id
                }
            }
        }
        let resp = await queries.updateField(buyer, { _id: request.params.customer_id }, update)
        resp = await buyer.findOne({ _id: request.params.customer_id })
        console.log(resp)
        return { "status": 200, body: resp.address }
    }    
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}