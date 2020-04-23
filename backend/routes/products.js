const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const Product = require('../dbModels/productModel')

router.post('/addproduct' , async (req, res) => {

    if(req.body){
        const newProduct = new Product(req.body)
        newProduct.save( (error, response) => {
            if(error){
                throw new error('error', error)
            }else{
                console.log('response - ', response)
                res.json(response)
            }
        })
    }
})

router.get('/:product_id', async (req, res, next) => {

    const _id = req.params.product_id

    if(_id === "getall" ){
        return next()
    }

    Product.findById(_id)
    .exec()
    .then( response => {
        console.log('response - ', response)
        res.status(200).json(response)
    })
    .catch( error => {
        console.log('error- ', error)
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
        .catch( error => {
            console.log('error- ', error)
        })
})

router.get('/getall', async (req, res) => {
    Product.find()
            .exec()
            .then( response => {
                res.json(response)
            })
            .catch( error => {
                console.log('error  - ', error)
                res.status(400).send({'error': 'error while getting products'})
            })
})


module.exports = router