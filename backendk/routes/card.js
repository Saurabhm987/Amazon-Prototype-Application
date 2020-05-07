const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const cardServices = require('../services/card')
const checkAuth = require('../config/passport')
var kafka = require('../kafka/client');


router.get('/getCard/:customer_id', async (request, response) => {

    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getCard"
        }
///
await kafka.make_request('address-card', data, async (err, data) => {
    if (err) throw new Error(err)
    await response.status(data.status).json(data.body);
});
///
        // let res = await cardServices.getCard(data);
        // response.status(res.status).json(res.body);
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting address details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



router.post('/addCard', checkAuth, async (request, response) => {

    try {
        const data = {
            "body": request.body,
            "id": request.user.userId,
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type": "addCard"

        }
        console.log(data)
        ///
        await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await cardServices.addCard(data);
        // response.status(res.status).json(res.body);
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

        return response.status(code).json({ message });
    }
});

router.put('/updateCard/:customer_id/card/:id', async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "updateCard"

        }
        // let res = await cardServices.updateCard(data);

        // console.log('updated response ----', res)

        // response.status(res.status).json(res.body);
        ///
        await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating address'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



router.delete('/deleteCard/:customer_id/card/:card_id', async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "deleteCard"

        }
        ///
        await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await cardServices.deleteCard(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});


module.exports = router