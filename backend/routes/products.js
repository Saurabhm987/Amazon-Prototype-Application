const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const Product = require('../dbModels/productModel')
const productServices = require('../services/products')


// /user/search?searchText=${searchText}&filterText=${filterText}&offset=${offset}&sortType=${sortType}`)

router.get('/search', async (request, response) => {
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

module.exports = router