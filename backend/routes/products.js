const keys = require('../config/keys'),
      fs = require('fs'),
      AWS = require('aws-sdk'),
      express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Product = require('../dbModels/productModel'),
      uuidv4 = require('uuid/v4'),
      multer = require('multer'),
      DIR = './public'
    
const storage = multer.diskStorage({
    destination: ( req, file , cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
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


AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    Bucket: keys.bucket_name,
    region: 'us-west-1'
  });

var s3= new AWS.S3();

router.post('/addproduct' ,uploadMultiple, (req, res) => {

    var product = JSON.parse(req.body.productInfo)
    var productImages = []
    const files = req.files

    product.images = productImages
    const newProduct = new Product(product)

    newProduct.save( (error, response) => {
        if(error){
            res.status(500).send({'error': 'error while saving product'})
        }else{
            const storedId = response._id
            console.log('storeId - ', storedId)
            uploadS3(files, storedId)
        }
    })

    function uploadS3(files, storedId){
        files.map( file => {    
            fs.readFile(file.path, (error, filedata) => {    
                if (!error) {
    
                    const targetName = file.filename
                    const mimetype = file.mimetype
                    const putParams = {
                        Bucket      : keys.bucket_name,
                        Key         : targetName,
                        Body        : filedata,
                        ContentType : mimetype,
                        ACL: "public-read"
                    };
    
                    s3.putObject(putParams, function(err, data){
                        if (err) {
                            return res.json({success:'could not upload file to s3 bucket'})
                        }else{
                            let storeURL = keys.img_url + targetName;
                            Product.findOneAndUpdate(
                                {_id: mongoose.Types.ObjectId(storedId)},
                                {
                                    $push : {images : storeURL}
                                }
                            )
                            .then(response => {
                                console.log('response - ', response)
                            })
                            .catch( error => {
                                console.log('error - ', error)
                                return res.json({'error' : 'error while updating db'})
                            })
                        }
                    });
                }else{
                    console.log('error while reading - ', error)
                    return res.json({'error' : 'error while updating s3 bucket'})
                }
            })
        })
        res.json({'success':'uploaded successfully'})
    }
})


router.get('/:product_id', async (req, res, next) => {

    const _id = req.params.product_id

    if(_id === "getallproduct" ){ 
        return next()
    }

    Product.findById(_id)
    .exec()
    .then( response => {
        res.status(200).json(response)
    })
    .catch( () => {
        res.status(500).send({'error': 'error while fetching data'})
    })

})

router.get('/sellerproduct/:seller_id', async (req, res) => {

    const _id = req.params.seller_id

    Product.find({"seller.sellerId" : _id})
        .exec()
        .then( response => {
            console.log('response - ', response)
            res.status(200).json(response)
        })
        .catch( () => {
            req.status(500).send({'error':'something went wrong!'})
        })
})

router.get('/getallproduct', async (req, res) => {
    Product.find()
            .exec()
            .then( response => {
                res.json(response)
            })
            .catch( error => {
                console.log('error  - ', error)
                res.status(500).send({'error': 'error while getting products'})
            })
})


module.exports = router