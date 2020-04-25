const express = require('express');
const router = express.Router();
const queries = require('../queries/mongoQueries')
const products = require('../dbModels/productModel')

exports.getProductsforCustomer = async (request) => {
    try {
        const { searchText, filterText, offset, sortType } = request.query;
        if (searchText === "" && filterText === "") {
            query = { 'isAvailable': true }
        } else if (searchText === "") {
            query = { 'category': filterText, 'isAvailable': true };
        } else if (filterText === "") {
            query = {
                $or: [{ 'productName': { $regex: searchText, $options: 'i' }, 'isAvailable': true },
                { 'category': { $regex: searchText, $options: 'i' }, 'isAvailable': true }]
            };
        } else {
            query = { 'productName': { $regex: searchText, $options: 'i' }, 'category': filterText, 'isAvailable': true };
        }
        if (sortType === 'PriceLowtoHigh') {
            sortBy = { price: 1 }
        } else if (sortType === 'PriceHightoLow') {
            sortBy = { price: -1 }
        } else if (sortType === 'AvgReview') {
            sortBy = { overallRating: -1 }
        } else {
            sortBy = {}
        }
        // console.log(query)
        // console.log(sortBy)
        // console.log(offset)
        // const cate = await queries.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})
        const resp = await queries.findDocumentsByQueryFilter(products, query, { _id: 1, productName: 1, price: 1, overallRating: 1, images: 1 }, { skip: Number(offset) - 1, limit: 50, sort: sortBy })
        const count = await queries.countDocumentsByQuery(products, query)
        console.log(resp)
        console.log(count)

        // let res = {Products:resp,Categories:cate,Count:count}
        let res = {Products:resp,Count:count}

        return { "status": 200, body: res }
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

        return { "status": code, body: { message } }
    }
   
}