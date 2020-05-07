const sellerServices = require('../services/seller')
const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {


    try {

        const res = await sellerServices.getAllSeller()

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting seller'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})


router.get('/profile/:sellerId', async (request, response) => {

    try {

        const body = {
            params : request.params
        }

        const res = await sellerServices.getSellerProfile(body)

        console.log('res - ', res)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting seller profile'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }

})


router.get('/profileupdate/:sellerId', async (request, response) => {

    try {

        const body = {
            body: request.body,
            params : request.params
        }

        const res = await sellerServices.updateSellerProfile(body)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting seller profile'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }

})

module.exports = router
