const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const buyer = require('../dbModels/buyer')
const ObjectID = require('mongodb').ObjectID

exports.getCard = async (request) => {
<<<<<<< HEAD
    try {
        console.log(request.params)
        const resp = await buyer.findOne({ _id : request.params.customer_id })
=======
    try{
        console.log('aaaaaaaaa')

        const resp = await queries.findDocumentsById(buyer, '5ea6217130c53720685db7dd')
>>>>>>> 489282b02576151687d46a0396ee57490e4a4f58
        console.log(resp)
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
    try {
        console.log(request.body)
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
        console.log(update)
<<<<<<< HEAD
        const resp = await queries.updateField(buyer, { email: request.user.email }, update)
=======
        const resp = await queries.updateField(buyer,{ _id:'5ea6217130c53720685db7dd'},update)
>>>>>>> 489282b02576151687d46a0396ee57490e4a4f58
        console.log(resp)
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