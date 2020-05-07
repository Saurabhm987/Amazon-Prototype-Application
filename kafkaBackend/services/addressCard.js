const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID = require('mongodb').ObjectID


handle_request = async(request, callback) => {
    if (request.type === "getAddress") {
        try {
            console.log(request.params)
            console.log("aaa")
            const resp = await queries.findDocumentsById(buyer, '5ea6217130c53720685db7dd')
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
    else   if (request.type === "addAddress") {






    }
    else   if (request.type === "deleteAddress") {






    }
    else   if (request.type === "updateAddress") {






    }



}

    exports.handle_request = handle_request;