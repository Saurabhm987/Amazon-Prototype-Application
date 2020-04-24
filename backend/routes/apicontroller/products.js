const productDao = require('../dbcontroller/products')

const keys = require('../../config/keys'),
      fs = require('fs'),
      AWS = require('aws-sdk'),
      express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Product = require('../../dbModels/productModel'),
      uuidv4 = require('uuid/v4'),
      multer = require('multer'),
      DIR = './public',
      multerS3 = require('multer-s3')

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
router.post('/addproduct' ,uploadMultiple, async (req, res) => {

    var product = JSON.parse(req.body.productInfo)
    let productImages = []

    req.files.map(file => {
        productImages.push(file.location)
    })

    product.images = productImages

    const result = productDao.addProduct(product)

    res.json(result)

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

    if(_id === "getallproduct" ){ 
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
router.get('/sellerproduct/:seller_id', async (req, res) => {

    const _id = req.params.seller_id
    console.log('id - ', _id)

    try{
        const result = await productDao.getsellerProduct(_id)
        res.json(result)
    }catch{
        res.status(500).send({'error':'something went wrong'})
    }
})


/* 
    List of all product to display for customer dashboard

    request_body = {}
    response_body = {
        [...all products]
    }

*/
router.get('/getallproduct', async (req, res) => {
    try{
        const result = await productDao.getallProduct()
        res.json(result)
    }catch{
        res.status(500).send({'error': 'something went wrong!'})
    }
})


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