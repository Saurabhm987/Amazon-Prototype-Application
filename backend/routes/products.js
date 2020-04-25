const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const Product = require('../dbModels/productModel')
const productServices = require('../services/products')


// router.post('/addproduct' , async (req, res) => {

//     if(req.body){
//         const newProduct = new Product(req.body)
//         newProduct.save( (error, response) => {
//             if(error){
//                 throw new error('error', error)
//             }else{
//                 console.log('response - ', response)
//                 res.json(response)
//             }
//         })
//     }
// })

// router.get('/:product_id', async (req, res, next) => {

//     const _id = req.params.product_id

//     if(_id === "getall" ){
//         return next()
//     }

//     Product.findById(_id)
//     .exec()
//     .then( response => {
//         console.log('response - ', response)
//         res.status(200).json(response)
//     })
//     .catch( error => {
//         console.log('error- ', error)
//     })

// })

// router.get('/sellerproduct/:seller_id', async (req, res) => {

//     const _id = req.params.seller_id

//     Product.find({"seller.sellerId" : _id})
//         .exec()
//         .then( response => {
//             console.log('response - ', response)
//             res.status(200).json(response)
//         })
//         .catch( error => {
//             console.log('error- ', error)
//         })
// })

// router.get('/getall', async (req, res) => {
//     const _id = req.params.product_id
//     if(_id === "getallproduct" ){
//         return next()
//     }    Product.find()
//             .exec()
//             .then( response => {
//                 res.json(response)
//             })
//             .catch( error => {
//                 console.log('error  - ', error)
//                 res.status(400).send({'error': 'error while getting products'})
//             })
// })
//*******************************sreeja */
// /user/search?searchText=${searchText}&filterText=${filterText}&offset=${offset}&sortType=${sortType}`)

router.get('/search', async (request, response) => {
    try {
      console.log(request.query)
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



//********************************sreeja */

module.exports = router