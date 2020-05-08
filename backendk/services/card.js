const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID = require('mongodb').ObjectID

exports.getCard = async (request) => {
    try{

        const resp = await queries.findDocumentsById(buyer, request.params.customer_id)

        return { "status": 200, body: resp.card }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching card details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

exports.addCard = async (request) => {

    console.log('add card request ---', request)

    const{user} = request

    try {
        update = {
            $push: {
                "card": {
                    "name": request.body.name,
                    "number": request.body.number,
                    "expiryDate": request.body.expiryDate,
                    "cvv": request.body.cvv
                }
            }
        }

        // take id from current user

        const resp = await queries.updateField(buyer,{ _id:user.userId},update)
        return { "status": 200, body: resp.card }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding card details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

exports.updateCard = async (request) => {
    try {
        console.log(request.params)
        update = {
            'card.$.name': request.body.name,
            'card.$.number': request.body.number,
            'card.$.expiryDate': request.body.expiryDate,
            'card.$.cvv': request.body.cvv
        }

        // find query
        let resp = await queries.updateField(buyer, { _id: request.params.customer_id, 'card._id': request.params.id }, update)
        resp = await buyer.findOne({ _id: request.params.customer_id })
        console.log(resp)
        return { "status": 200, body: resp.card }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating card details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}


exports.deleteCard = async (request) => {
    try {
        console.log(request.params)
        update = {
            $pull: {
                "card": {
                    "_id": request.params.card_id
                }
            }
        }
        let resp = await queries.updateField(buyer, { _id: request.params.customer_id }, update)
        resp = await buyer.findOne({ _id: request.params.customer_id })
        console.log(resp)
        return { "status": 200, body: resp.card }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting card'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}