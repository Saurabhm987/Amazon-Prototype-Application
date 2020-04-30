const queries = require('../queries/mongoQueries')
products = require('../dbModels/product')
productCategory = require('../dbModels/productCategory')
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
            query = {
                $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false },
                { 'seller.name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false }]
            };
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
        const resp = await queries.findDocumentsByQueryFilter(products, query, { _id: 1, name: 1, price: 1, overallRating: 1, images: 1, "seller": 1 }, { skip: Number(offset) - 1, limit: 50, sort: sortBy })
        const count = await queries.countDocumentsByQuery(products, query)
        console.log(resp)
        console.log(count)

        // let res = {Products:resp,Categories:cate,Count:count}
        let res = { Products: resp, Count: count }

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
    try {
        // const { body, files } = request
        const { body } = request

        var product = body
        let productImages = []

        // if(files){
        //     files.map(file => {
        //         productImages.push(file.location)
        //     })
        // }
        
        product.images = productImages
        product.seller._id = new mongoose.Types.ObjectId()

        const result = await queries.createDocument(products, product)

        return { status: 200, body: result.toObject() }

    } catch (error) {
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
    try {

        const { body, params } = request

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
            $set:
            {
                name: name,
                category: category,
                quantity: quantity,
                price: price,
                description: description,
                giftPrice: giftPrice
            }
        }

        let findQuery = { _id: mongoose.Types.ObjectId(_id) }

        const result = await queries.updateField(products, findQuery, upadateQuery)

        return { status: 200, body: result }

    } catch (error) {
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

const addReview = async (request) => {

    try {
        const { body, params } = request

        const {
            userId,
            comment,
            rating,
            header,
        } = body

        let _id = mongoose.Types.ObjectId(params.product_id)

        //currently no user id 
        // userId = new mongoose.Types.ObjectId(userId)

        let findQuery = {
            _id: _id
        }

        let upadateQuery = {

            '$push':
            {
                'review':
                {
                    userId: new mongoose.Types.ObjectId(),
                    comment: comment,
                    rating: rating,
                    header: header,
                }
            }
        }

        const result = await queries.updateField(products, findQuery, upadateQuery)

        return { status: 200, body: result }

    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding review'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}


const addCategory = async (request) => {

    try {

        const { body } = request
        let category = { name: body.category }

        const result = await queries.createDocument(productCategory, category)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while adding category'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

// don't need to create mongoID to find in subdoc
// let _id = mongoose.Types.ObjectId(params.seller_id)

const getsellerProduct = async (request) => {

    try {

        const { params } = request
        let _id = params.seller_id
        
        let findQuery = { 'seller._id': _id, 'removed': false }

        const result = await queries.findDocumets(products, findQuery)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting seller product'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const getProduct = async (product_id) => {

    try {

        let findId = product_id
        const result = await queries.findDocumentsById(products, findId)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting product'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const getallcategories = async () => {

    try {

        const findQuery = {}
        const result = await queries.findDocumets(productCategory, findQuery)
        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting product'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const deleteProduct = async (request) => {
    try {

        const { params } = request
        let product_id = params.product_id

        let findQuery = {_id : product_id}
        
        let updateQuery = { $set : { removed : true}}

        const result = await queries.updateField(products, findQuery, updateQuery)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting product'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const incproductCount = async (category, quantity) => {
    try {

        let findQuery = { name: category}
        let updateQuery = { $inc : { numOfProducts : quantity}}

        await queries.updateField(productCategory, findQuery, updateQuery)

        return { status: 200 }


    } catch (error) {

         if (error.message)
            message = error.message
        else
            message = 'Error while increamenting product quantity'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

const dcrproductCount = async (category, quantity) => {
    try {

        let findQuery = { name: category, numOfProducts:{ $gt : 0 }}
        let updateQuery = { $inc : { numOfProducts : -quantity}}

        const result = queries.updateField(productCategory, findQuery, updateQuery)

        if (result.modifiedCount === 1)
            status = 200
        else
            status = 500
        
        return { status: status }


    } catch (error) {

         if (error.message)
            message = error.message
        else
            message = 'Error while decreamenting product quantity'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}


module.exports = {
    addProduct: addProduct,
    updateProduct: updateProduct,
    getProductsforCustomer: getProductsforCustomer,
    addReview: addReview,
    addCategory: addCategory,
    getsellerProduct: getsellerProduct,
    getProduct: getProduct,
    getallcategories: getallcategories,
    deleteProduct: deleteProduct,
    incproductCount:incproductCount,
    dcrproductCount:dcrproductCount,
}