const keys = require('../config/keys'),
    AWS = require('aws-sdk'),
    express = require('express'),
    router = express.Router(),
    uuidv4 = require('uuid/v4'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    productServices = require('../services/products'),
    cachedcategories = require('../redis/getcategories'),
    redis = require('redis'),
    client = require('../index')


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

var uploadMultiple = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed !'));
        }
    }
}).array('images', 5)


/* 
  seller can add products having mulitple images per product
  requested_body = {
      productInfo : form data conataining product info
      files: product images
  }

  response_body = {
      success message
  }
*/
router.post('/addproduct', uploadMultiple, async (request, response) => {

    let data = JSON.parse(JSON.stringify(request.body))

    try {

        const requestBody = {
            body: data,
            files: request.files,
        }

        const res = await productServices.addProduct(requestBody)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while adding product'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})


/*
    add review about product
    request_body = {
        header,
        comment,
        rating,
    }
    requst_params = {
        product_id
    }
    response = {
        {...product with review added}
    }

*/
router.post('/addreview/:product_id', async (request, response) => {
    try {
        const requestBody = { body: request.body, params: request.params }

        const result = await productServices.addReview(requestBody)

        response.json(result)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while adding review'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})


router.post('/addcategory', async (request, response) => {
    try {
        const requestBody = { body: request.body }

        const res = await productServices.addCategory(requestBody)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while adding category'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})


/* 
    update product information 
    request_body = {
        product properites to update
    }
    request_params = {
        product_id
    }
    response_body = {
        updated product information
    }
*/
router.put('/updateproduct/:product_id', async (request, response) => {

    try {

        const requestBody = { body: request.body, params: request.params }

        const result = await productServices.updateProduct(requestBody)

        response.json(result)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while updating product'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})



/* 
    Get product categories
    request_body ={}
    response_body = {
        [...{category}]
    }
*/

router.get('/getcategories',cachedcategories, async (request, response, next) => {
    try {

        console.log('fetching data from db....')

        const res = await productServices.getallcategories()

        client.set('categories', JSON.stringify(res))

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while fetching categories'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
})




/*
    seller will be able to see the product added by him

    request_body = {
        seller_id
    }

    response_body = {
        [...seller_product]
    }
*/
router.get('/sellerproduct/:seller_id', async (request, response) => {

    // const _id = req.params.seller_id

    console.log('hittin sellerprodcut')

    try {

        const requestBody = { params: request.params }

        const res = await productServices.getsellerProduct(requestBody)

        console.log('result - ', res)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting seller product'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }
})


// /user/search?searchText=${searchText}&filterText=${filterText}&offset=${offset}&sortType=${sortType}`)

router.get('/search', async (request, response) => {

    console.log('hitting')

    try {
        console.log(request.query)
        console.log("aa")

        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res = await productServices.getProductsforCustomer(data);
        response.status(res.status).json(res.body);

    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching products'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }

});




/*
    Delete product 
    request_params = {
        product_id
    }
    response_body = {
        success or error
    }
*/
router.put('/deleteproduct/:product_id', async (request, response) => {

    try {

        const requestBody = { params: request.params }

        const res = await productServices.deleteProduct(requestBody)

        response.status(res.status).json(res.body)
    }
    catch{

        if (error.message)
            message = error.message
        else
            message = 'Error while fetching products'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
})



/*
    seller and user can see the proudct details

    request_body = {
        product_id
    }
    
    response_body = {
        product_info_object
    }

*/
router.get('/:product_id', async (req, res, next) => {

    console.log('hitting product route')

    const product_id = req.params.product_id

    if (product_id === 'updateproduct') {
        return next()
    }

    try {

        const result = await productServices.getProduct(product_id)

        res.json(result)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting product'

        if (error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({ 'error': message })
    }

})



module.exports = router