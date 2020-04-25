    const   Product = require('../../dbModels/product'),
            mongoose = require('mongoose')

    async function getallProduct(_id){
        try{
            return response = await Product.find()
        }catch{
            return {'error' : "something went wrong"}
        }
    }

    async function getProduct(_id){
        try{
            return response = await Product.findById(_id)
        }catch{
            return {'error':'something went wrong!'}
        }
    }

    async function getsellerProduct(_id){
        try{
            return response = await Product.find({"seller.sellerId" : _id})
        }catch{
            return {'error' : "something went wrong"}
        }
    }

    async function addProduct(request_body){

        console.log('request_body - ', request_body)

        try{
            const newProduct = await new Product(request_body)
            response = await newProduct.save()
            console.log('response - ', response)
            return response
        }catch{
            return {'error':'something went wrong'}
        }
    }

    async function deleteProduct(_id){
        try{
            const response = await Product.deleteOne({_id: mongoose.Types.ObjectId(productId)})
            return {'success':response};
        }catch{
            return {'error' : "product doesn't exist!"}
        }
    }

    module.exports = {
        deleteProduct : deleteProduct,
        getallProduct: getallProduct,
        getsellerProduct: getsellerProduct,
        getProduct:getProduct,
        addProduct:addProduct,
    }
