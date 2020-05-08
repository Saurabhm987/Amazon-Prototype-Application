var kafka = require('../kafka/client');

const keys = require('../config/keys'),
    AWS = require('aws-sdk'),
    express = require('express'),
    router = express.Router(),
    uuidv4 = require('uuid/v4'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    productServices = require('../services/products'),
    cachedcategories = require('../redis/cachedcategories'),
    cachedsearch = require('../redis/cachedsearch'),
    client = require('../index'),
    fakeproduct = require('../config/faker'),
    checkAuth = require('../config/passport');


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


    console.log('hitting add product')

    let data = JSON.parse(JSON.stringify(request.body))

    try {

        // let data = await fakeproduct()
        // console.log('data - ', data)
        // for(let i = 0; i < 4000; i ++){
        // let data = await fakeproduct()
        // console.log('adding ...', i)
        // }

        const requestBody = {
            body: data,
            files: request.files,
        }

        const res = await productServices.addProduct(requestBody)

        if (res.body) {
            // await client.exists('products', async (error, reply) => {
            //     if(error) throw error

            //     if(reply){
            //         await client.del('products',(error, reply) => {
            //             if(error) throw error

            //             if(reply){
            //                 console.log('cache has been cleared!')
            //             }
            //         })
            //     }
            // })

            const { category, quantity } = res.body

            var result = await productServices.incproductCount(category, quantity)
            
        }

        if (result.status === 200)
            response.status(res.status).json(res.body)
        else
            response.status(500).json('cannot increment quantity')

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


// router.get('/searchWithKafka', cachedsearch, async (request, response) => {

//     console.log('Kafka search api call')

//     try {

//         const data = {
//             "body": request.body,
//             "params": request.params,
//             "query": request.query,
//             "type":"ProductSearchResults"
//         }

//         // params = { topic_name, request_body, callback}
//         await kafka.make_request('product', data, async (err, data) => {
//             if (err) throw new Error(err)

//             await client.set('products', JSON.stringify(data.body))

//             response.status(data.status).json(data.body);
//         });

//         // let res = await productServices.getProductsforCustomer(data);
//         // response.status(res.status).json(res.body);

//     }
//     catch (error) {
//         if (error.message)
//             message = error.message
//         else
//             message = 'Error while fetching products'

//         if (error.statusCode)
//             code = error.statusCode
//         else
//             code = 500

//         return response.status(code).json({ message });
//     }

// });



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
router.post('/review/:product_id', checkAuth, async (request, response) => {

    console.log('hitting adreview')

    try {
        const requestBody = { body: request.body, params: request.params, user:request.user }

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


/* 
    request_body = {
        name,
        quantity,
    }

    response = {
        name: ''
        quantit: '',
    }

*/


router.put('/addcategory', async (request, response) => {

    console.log('hitting addcategory')

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

        response.json(result.body) 

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

router.get('/getcategories', async (request, response) => {
    try {

        console.log('getting categories')

        const res = await productServices.getallcategories()

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


router.delete('/deletecategory/:category_name', async(request, response) => {

    try {

        const res = await productServices.deleteCategory(request)

        response.status(res.status).json(res.body)

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while deleting categories'

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

    try {

        const requestBody = { params: request.params }

        const res = await productServices.getsellerProduct(requestBody)

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


router.get('/search', async (request, response) => {

    console.log('search api call....')

    try {

        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res = await productServices.getProductsforCustomer(data);

        // client.set('products', JSON.stringify(res.body))

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


// /user/search?searchText=${searchText}&filterText=${filterText}&offset=${offset}&sortType=${sortType}`)

router.get('/getSellerPaginatedResult', async (request, response) => {

    console.log('paginated seller api call....')

    try {

        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
        }
        let res = await productServices.getProductsforSeller(data);
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



router.post('/incrementview/:product_id', async (request, response) => {

    console.log('hitting increment view')

    try {
        const requestBody = { params: request.params }

        const result = await productServices.incrementView(requestBody)

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




router.get('/review/:product_id', async (request, response) => {

    console.log('paginated seller api call....')

    try {

        const{ params} = request

        let res = await productServices.getReview(params);
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

    console.log('hitting deleteproduct')

    try {

        const requestBody = { params: request.params }

        const res = await productServices.deleteProduct(requestBody)

        if (res.body) {
            const { category, quantity } = res.body
            var result = await productServices.dcrproductCount(category, quantity)
        }

        if (result.status === 200)
            response.status(res.status).json(res.body)
        else
            response.status(500).json('Product has already been deleted!')
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

    console.log('hitting get product route')

    const product_id = req.params.product_id

    if (product_id === 'updateproduct' || product_id === 'testroute' || product_id==='getcategories') {
        return next()
    }

    try {

        const result = await productServices.getProduct(product_id)

        res.status(result.status).json(result.body)

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