    const   Product = require('../../dbModels/product'),
            mongoose = require('mongoose')

    async function getallProduct(_id){
        try{
            return response = await Product.find()
        }catch{
            return {'error' : "Error while fetching products!"}
        }
    }

    async function getProduct(_id){
        try{
            return response = await Product.findById(_id)
        }catch{
            return {'error':'Can not get product detail!'}
        }
    }

    async function getsellerProduct(_id){
        try{
            return response = await Product.find({"seller.sellerId" : _id})
        }catch{
            return {'error' : "Can not fetch seller products!"}
        }
    }

    async function productCategories(){
        try{
            return response = await Product.find({},{category:1, _id:0})
        }catch{
            return {'error': 'Can not fetch categories!'}
        }
    }

    async function addProduct(request_body){

        try{
            const newProduct = await new Product(request_body)
            response = await newProduct.save()
            console.log('response - ', response)
            return response
        }catch{
            return {'error':'Can not add product!'}
        }
    }

    async function deleteProduct(_id){
        try{
            const response = await Product.deleteOne({_id: mongoose.Types.ObjectId(productId)})
            return {'success':response};
        }catch{
            return {'error' : "Product doesn't exist!"}
        }
    }

    module.exports = {
        deleteProduct : deleteProduct,
        getallProduct: getallProduct,
        getsellerProduct: getsellerProduct,
        getProduct:getProduct,
        addProduct:addProduct,
        productCategories:productCategories,
    }
