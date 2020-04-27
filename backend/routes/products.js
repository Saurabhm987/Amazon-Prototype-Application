const keys = require('../config/keys'),
      AWS = require('aws-sdk'),
      express = require('express'),
      router = express.Router(),
      uuidv4 = require('uuid/v4'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      mongoose = require('mongoose'),
      productServices = require('../services/products')

AWS.config.update({
accessKeyId: keys.iam_access_id,
secretAccessKey: keys.iam_secret,
region: 'us-west-1'
});

var s3= new AWS.S3();

const storage = multerS3({
    s3:s3,
    bucket: keys.bucket_name,
    acl: 'public-read',
    key: function(req, file, cb){
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-')
        cb(null, uuidv4()+'-'+fileName)
    }
})

var uploadMultiple = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed !'));
        }
    }
}).array('images', 2)


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
router.post('/addproduct' ,uploadMultiple, async (request, response) => {
    try{
        const requestBody = {
            body: request.body,
            files:request.files,
        }

        const res = await productServices.addProduct(requestBody)

        console.log('response - ', res)

        response.status(res.status).json(res.body)

    }catch(error){

        if(error.message)
            message = error.message
        else
            message = 'Error while adding product'

        if(error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({'error':message})
    }   
})

router.post('/addreview/:product_id', async (request, response) => {
    try{
        const requestBody = { body:request.body, params: request.params }
        console.log('request body - ', requestBody)
    
        const result = await productServices.addReview(requestBody)

        response.json(result)

    }catch(error){

        if(error.message)
            message = error.message
        else
            message = 'Error while adding product'

        if(error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({'error':message})
    }
})


router.post('/addcategory', async (request, response) => {
    try{
        const requestBody = { body: request.body }

        const res = await productServices.addCategory(requestBody)

        response.status(res.status).json(res.body)

    }catch(error){

        if(error.message)
            message = error.message
        else
            message = 'Error while adding product'

        if(error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({'error':message})
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

    try{
        console.log('hitting.......')
        const requestBody = { body:request.body, params: request.params }
        console.log('request body - ', requestBody)
    
        const result = await productServices.updateProduct(requestBody)

        response.json(result)

    }catch(error){

        if(error.message)
            message = error.message
        else
            message = 'Error while adding product'

        if(error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({'error':message})
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

    const _id = req.params.product_id

    if(_id === "getallproduct" || _id ==="productcategories" || _id === 'updateproduct'|| _id === 'search' ){ 
        return next()
    }

    try{
        const result = await productDao.getProduct(_id)
        res.json(result)
    }catch{
        res.status(500).send({'error':'something went wrong'})
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

    try{

        const requestBody = { params : request.params }

        const res = await productServices.getsellerProduct(requestBody)

        response.status(res.status).json(res.body)

    }catch(error){

        if(error.message)
        message = error.message
        else
            message = 'Error while adding product'

        if(error.status)
            status = error.status
        else
            status = 500

        response.status(status).json({'error':message})
    }
})


/* 
    Get product categories
    request_body ={}
    response_body = {
        [...{category}]
    }
*/
router.get('/productcategories', async (req, res) => {
    try{
        const result = await productDao.productCategories()
        res.json(result)
    }catch{
        res.status(500).send({'error': 'something went wrong while getting categories!'})
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
       let res =await productServices.getProductsforCustomer(data);
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
router.delete('/deleteproduct/:product_id', async (req, res) => {

    try{
        const _id = req.params.product_id
        const result = await productDao.deleteProduct(_id)
        res.json(result)
    }
    catch{
        res.status(500).send({'error': 'something went wrong'})
    }

})



module.exports = router