// // const query =require('../Database/queries');
// var ObjectId = require('mongodb').ObjectID;
// // const queries =require('../queries/mongoQueries');


// const queries = require('../queries/mongoQueries'),
// products = require('../dbModels/product'),
// productCategory = require('../dbModels/productCategory'),
// mongoose = require('mongoose')

// const handle_request = async (request) => {
//     if (request.type === "ProductSearchResults") {
//     try {
//         const { searchText, filterText, offset, sortType } = request.query;
//         if (searchText === "" && filterText === "") {
//             query = { 'removed': false }
//         } else if (searchText === "") {
//             query = { 'category': filterText, 'removed': false };
//         } else if (filterText === "") {
//             query = {
//                 $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'removed': false },
//                 { 'category': { $regex: searchText, $options: 'i' }, 'removed': false },
//                 { 'seller.name': { $regex: searchText, $options: 'i' }, 'removed': false }]
//             };
//         } else {
//             query = {
//                 $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false },
//                 { 'seller.name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false }]
//             };
//         }
//         if (sortType === 'PriceLowtoHigh') {
//             sortBy = { price: 1 }
//         } else if (sortType === 'PriceHightoLow') {
//             sortBy = { price: -1 }
//         } else if (sortType === 'AvgReview') {
//             sortBy = { overallRating: -1 }
//         } else {
//             sortBy = {}
//         }
//         console.log(query)
//         console.log(sortBy)
//         console.log(offset)
//         // const cate = await queries.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})
//         const resp = await queries.findDocumentsByQueryFilter(products, query, { _id: 1, name: 1, price: 1, overallRating: 1, images: 1, "seller": 1 }, { skip: Number(offset) - 1, limit: 50, sort: sortBy })

//         const count = await queries.countDocumentsByQuery(products, query)
//         // console.log(resp)
//         // console.log(count)

//         // let res = {Products:resp,Categories:cate,Count:count}
//         let res = { Products: resp, Count: count }

//         return { "status": 200, body: res }
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

//         return { "status": code, body: { message } }
//     }
// }

// }

// exports.handle_request = handle_request;