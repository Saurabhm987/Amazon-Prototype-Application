const customerService = require('../services/customer')

const keys = require('../config/keys'),
    AWS = require('aws-sdk'),
    express = require('express'),
    router = express.Router(),
    uuidv4 = require('uuid/v4'),
    multer = require('multer'),
    multerS3 = require('multer-s3')
    mongoose = require('mongoose')


AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    region: 'us-west-1'
});

var s3 = new AWS.S3();

const storage = multerS3({
    s3: s3,
    bucket: keys.bucket_name,
    acl: 'public-read',
    key: function (req, file, cb) {
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed !'));
        }
    }
}).array('image', 1)



router.get('/profile/:customer_id', async (request, response) => {

    try {

        const body = {
            params : request.params
        }

        const res = await customerService.getCustomerProfile(body)

        console.log('seller profile response - ', res)

        response.status(res.status).json(res.body[0])

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting customer profile'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }

})


router.post('/profileupdate/:customer_id', upload, async (request, response) => {

    try {

        let data = JSON.parse(JSON.stringify(request.body))

        const body = {
            body: data,
            params : request.params,
            file: request.files
        }

        console.log('update body --', body)

        const res = await customerService.updateCustomerProfile(body)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while updating customer profile'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }

})

module.exports = router
