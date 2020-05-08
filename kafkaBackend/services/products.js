
const queries = require('../queries/mongoQueries')
 product = require('../dbModels/product')
productCategory = require('../dbModels/productCategory')
buyer = require('../dbModels/buyer')
mongoose = require('mongoose')


handle_request = async (request, callback) => {
    if (request.type === "addProduct") {  
        try {
            const { body, files } = request
    
            var products = new Object()
            products = JSON.parse(JSON.stringify(body))
    
            let productImages = []
    
            if (files) {
                files.map(file => {
                    productImages.push(file.location)
                })
            }
    
            products.images = productImages
    
            console.log(' product result ------', products)
    
            const result = await queries.createDocument(product, products)
    
            await console.log('result after product added', result)
    
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
    //////////////////////////will not work
    else if (request.type === "updateProduct") {
        try {

            console.log('in update product function')
    
            const { body, params } = request
    
            const {
                name,
                category,
                quantity,
                price,
                description,
                giftPrice,
            } = body
    
            const _id = params.product_id
    
            const getProdData = await getProduct(_id)
    
            let currquantity = getProdData.body.quantity
    
            if (currquantity !== quantity) {
    
                dcrres = await dcrproductCount(category, currquantity)
    
                if (dcrres.numOfProducts < 0 && null) {
    
                    throw new Error('Can not update product!')
                }
    
                await incproductCount(category, quantity)
            }
    
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
    
            const result = await queries.updateField(product, findQuery, upadateQuery)
    
            return { status: 200, body: result }
    
        } catch (error) {
            if (error.message)
                message = error.message
            else
                message = 'Error while updating product'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
    }
    else if (request.type === "getProductsforCustomer") {
        try {
       
            const { searchText, filterText, offset, sortType, ratingFilter, price } = request.query;
            // rating = Number(ratingFilt)
            // priceFilter = Number(priceFilter)
    
            var rating = Number(ratingFilter)
            var priceFilter = Number(price)
    
            if(priceFilter<0)
            priceFilter=10000000
            if (searchText === "" && filterText === "") {
                query = { 'removed': false, overallRating:{$gte:rating}, price:{$lte:priceFilter} }
            } else if (searchText === "") {
                query = { 'category': filterText, 'removed': false , overallRating:{$gte:rating}, price:{$lte:priceFilter}};
            } else if (filterText === "") {
                query = {
                    $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'removed': false, overallRating:{$gte:rating}, price:{$lte:priceFilter} },
                    { 'category': { $regex: searchText, $options: 'i' }, 'removed': false, overallRating:{$gte:rating}, price:{$lte:priceFilter} },
                    { 'sellerName': { $regex: searchText, $options: 'i' }, 'removed': false , overallRating:{$gte:rating}, price:{$lte:priceFilter}}]
                };
            } else {
                query = {
                    $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false, overallRating:{$gte:rating}, price:{$lte:priceFilter} },
                    { 'sellerName': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false, overallRating:{$gte:rating}, price:{$lte:priceFilter} }]
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
            // console.log(query)
            // console.log(sortBy)
            // console.log(offset)
            // const cate = await queries.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})
            const resp = await queries.findDocumentsByQueryFilter(product, query, { _id: 1, name: 1, price: 1, overallRating: 1, images: 1, "sellerName": 1 }, { skip: (Number(offset) - 1) * 12, limit: 12, sort: sortBy })
            // let countQuery = {removed:false}
            const count = await queries.countDocumentsByQuery(product, query)
            // console.log(resp)
            // console.log(count)
    
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
    
                console.log(message)
            return { "status": code, body: { message } }
        }
    }
    else if (request.type === "addReview") {
        try {
            const { body, params, user } = request
    
            const {
                userId,
                comment,
                rating,
                header,
            } = body
    
            // add review to buyer schema
            let findUserQuery = {
                _id: user.userId
            }
            let insertQuery = {
                '$push': {
                    comments: {
                        'productId': params.product_id,
                        'review': {
                            userId: user.userId,
                            comment: comment,
                            rating: rating,
                            header: header,
                        }
                    }
                }
            }
    
            await queries.updateField(buyer, findUserQuery, insertQuery);
            // add review to product schema
            let _id = mongoose.Types.ObjectId(params.product_id)
    
            let findQuery = {
                _id: _id
            }
    
            let upadateQuery = {
    
                '$push':
                {
                    'review':
                    {
                        userId: user.userId,
                        comment: comment,
                        rating: rating,
                        header: header,
                    }
                }
            }
    
            const updateReview = await queries.updateField(product, findQuery, upadateQuery)
    
            let countQuery = [
                {
                    '$match': {
                        '_id': _id
                    }
                },
                {
                    '$unwind': '$review'
                },
                {
                    '$group': {
                        _id: null,
                        total: {
                            '$sum': '$review.rating'
                        },
                        count: {
                            '$sum': 1
                        }
                    }
                },
                {
                    '$project': {
                        _id: 0,
                        total: 1,
                        count: 1,
                    }
                }
            ]
    
            let ratings = await queries.aggregationQuery(product, countQuery)
    
            let overallRating = ratings[0].total / ratings[0].count
    
            const result = await queries.updateField(product, { _id: mongoose.Types.ObjectId(_id) }, { $set: { overallRating: overallRating } })
    
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

    else if (request.type === "addCategory") {
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
    else if (request.type === "getsellerProduct") {
        try {

            const { params } = request
            let _id = params.seller_id
    
            let findQuery = { 'sellerId': _id, 'removed': false }
    
            const result = await queries.findDocumets(product, findQuery)
    
            return { status: 200, Products: result }
    
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
    else if (request.type === "getProduct") {
        try {
///////////////////need to be modified///////////
            let findId = request.product_id
///////////////////////////////////////////
            const result = await queries.findDocumentsById(product, findId)
    
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
    else if (request.type === "getallcategories") {
        try {

            const findQuery = {}
            const result = await queries.findDocumets(productCategory, findQuery)
            console.log(result)
            return { status: 200, body: result }
    
        } catch (error) {
            console.log(error)
    
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
    else if (request.type === "deleteProduct") {
        try {

            const { params } = request
            let product_id = params.product_id
    
            let findQuery = { _id: mongoose.Types.ObjectId(product_id) }
    
            console.log('findQuery - ', findQuery)
    
            let updateQuery = { $set: { removed: true } }
    
            const result = await queries.updateField(product, findQuery, updateQuery)
    
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
    ///////////////////need to be modified///////////

    else if (request.type === "incproductCount") {
        try {

            let findQuery = { name: request.category }
            let updateQuery = { $inc: { numOfProducts: request.quantity } }
    
            await queries.updateField(productCategory, findQuery, updateQuery)
    
            return { status: 200, body: result }
    
    
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
///////////////////need to be modified///////////

    else if (request.type === "dcrproductCount") {
        try {

            let findQuery = { name: request.category, numOfProducts: { $gte: 0 } }
            let updateQuery = { $inc: { numOfProducts: -request.quantity } }
    
            const result = await queries.updateField(productCategory, findQuery, updateQuery)
    
            console.log('respone after decreament ..., ', result)
    
            if (result !== null)
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
    else if (request.type === "getProductsforSeller") {
        try {
            const { searchText, filterText, offset, sortType, sellerId } = request.query;
            if (searchText === "" && filterText === "") {
                query = { sellerId: sellerId, 'removed': false }
            } else if (searchText === "") {
                query = { sellerId: sellerId, 'category': filterText, 'removed': false };
            } else if (filterText === "") {
                query = {
                    $and: [
                        {
                            sellerId: sellerId
                        },
                        {
                            $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'removed': false },
                            { 'category': { $regex: searchText, $options: 'i' }, 'removed': false },
                            { 'sellerName': { $regex: searchText, $options: 'i' }, 'removed': false }]
                        }
                    ]
                };
            } else {
                query = {
                    $and: [
                        {
                            sellerId: sellerId
                        },
                        {
                            $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false },
                            { 'sellerName': { $regex: searchText, $options: 'i' }, 'category': filterText, 'removed': false }]
                        }
                    ]
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
    
            const resp = await queries.findDocumentsByQueryFilter(product, query, { _id: 1, name: 1, description: 1, quantity: 1, category: 1, giftPrice: 1, sellerId: 1, sellerName: 1, price: 1, overallRating: 1, images: 1 }, { skip: ((Number(offset) - 1) * 3), limit: 3, sort: sortBy })
    
            const count = await queries.countDocumentsByQuery(product, query)
    
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
    else if (request.type === "deleteCategory") {
        try {

            const { params } = request
            let name = params.category_name
    
            let findQuery = { name: name }
    
            const result = await queries.findDocumets(productCategory, findQuery)
    
            if (result[0].numOfProducts === 0) {
    
                const res = await queries.deleteDocuments(productCategory, findQuery)
    
                if (res.deletedCount === 1) {
    
                    return { status: 200, body: 'category deleted' }
    
                }else{
                    throw new Error('Error while deleting category')
                }
            } else {
    
                throw new Error('Category can not delete')
            }
    
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
    else if(request.type="getReview"){

        try {

            const product_id = request.product_id
    
            console.log('review findqury - ', product_id)
            const result = await queries.findDocumentsById(product, product_id)
            return { status: 200, body: result.review }
    
        } catch (error) {
            console.log(error)
    
            if (error.message)
                message = error.message
            else
                message = 'Error while getting review'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
    


    }
    else if(request.type="incrementView"){
        try {

            const { product_id } = request.params
            console.log('review findqury - ', request)
    
            let findQuery = {
                $and: [
                    { _id: product_id },
                    {
                        'viewdata':
                            { "$gte": new Date("2015-05-27T00:00:00Z")}
                    }
                ]
    
            }
    
            let result = await queries.findDocumets(product, findQuery)
    
            console.log('result date comparison - ', result)
            // let updateQuery = {$set : { viewData : new Date()}, $inc: { views: 1 } }
            // const result = await queries.updateField(product, findQuery, updateQuery)
            return { status: 200, body: result.review }
    
        } catch (error) {
            console.log(error)
    
            if (error.message)
                message = error.message
            else
                message = 'Error while getting review'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
        
    }

}

exports.handle_request = handle_request;
