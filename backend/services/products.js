const queries = require('../queries/mongoQueries')
      products = require('../dbModels/product')
      mongoose = require('mongoose')

const getProductsforCustomer = async (request) => {
    try {
        const { searchText, filterText, offset, sortType } = request.query;
        if (searchText === "" && filterText === "") {
            query = { 'removed': false }
        } else if (searchText === "") {
            query = { 'category': filterText, 'removed': false };
        } else if (filterText === "") {
            query = {
                $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'removed': false },
                { 'category': { $regex: searchText, $options: 'i' }, 'removed': false },
                { 'seller.name': { $regex: searchText, $options: 'i' }, 'removed': false }]
            };
        } else {
            query = {$or: [{ 'name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false },
            { 'seller.name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false }]};
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
        console.log(query)
        console.log(sortBy)
        console.log(offset)
        // const cate = await queries.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})
        const resp = await queries.findDocumentsByQueryFilter(products, query, { _id: 1, name: 1, price: 1, overallRating: 1, images: 1, "seller.name": 1 }, { skip: Number(offset) - 1, limit: 50, sort: sortBy })
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


const addProduct = async (request) => {
    try{
        const {body, files} = request
        var product = JSON.parse(body.productInfo)

        let productImages = []
    
        files.map( file => {
            productImages.push(file.location)
        })

        product.images = productImages
        product.seller._id = new mongoose.Types.ObjectId()    
        const result = await queries.addProduct( products ,product)

        return {status:200, body:result}
    
    }catch (error){
        if (error.message)
            message = error.message
        else
            message = 'Error while adding product'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const updateProduct = async (request) => {
    try{

        const {body, params} = request

        const _id = params.product_id

        const {
            name, 
            category, 
            quantity,
            price,
            description,
            giftPrice,
        } = body

        let upadateQuery = {
            $set : 
            {
                name:name,
                category:category,
                quantity:quantity,
                price: price,
                description: description,
                giftPrice: giftPrice
            }
        }

        let findQuery = {_id : mongoose.Types.ObjectId(_id)}
          
        const result = await queries.updateField(products,findQuery, upadateQuery)
    
        return {status:200, body:result}
    
    }catch (error){
        if (error.message)
            message = error.message
        else
            message = 'Error while adding product'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const addComment = async (request) => {

    try{
        const { body, params } = request

        let comment = body.comment
        let _id = params.comment_id

        upadateQuery = {
            
        }

    }catch{
        if (error.message)
        message = error.message
        else
            message = 'Error while adding product'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }   
}

module.exports ={
    addProduct:addProduct,
    updateProduct:updateProduct,
    getProductsforCustomer:getProductsforCustomer,
    addComment: addComment
}