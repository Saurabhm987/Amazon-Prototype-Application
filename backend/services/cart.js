getProductsFromCart = async (request) => {
    try{
        console.log(request.params)
        const resp = await buyer.find({ _id: request.params.id }).
        populate('cart.product', { name: 1, price: 1, _id: 1, images: 1, description:1, active:1 })
        return { "status": 200, body: resp[0].cart }
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while fetching products from cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}
addProductInCart = async (request) => {
    try{
        console.log(request.body)
        update =  {$push:{"cart":{
                "product" : request.body.product_id,
                "gift"    : request.body.gift,
                "quantity"  : request.body.quantity
            }}}
        logger.log(update)
        const resp = await operations.updateField(customer,{ _id:request.params.customer_id},update)
        console.log(resp)
        return { "status": 200, body: resp.cart }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding into cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}
updateProductInCart = async (request) => {
    try{
        console.log(request.params)
        update = {'cart.$.gift': request.body.gift,
            'cart.$.quantity': request.body.quantity}
        const resp = await operations.updateField(customer,{ _id:request.params.customer_id,'cart._id':request.params.product_id},update)
        return { "status": 200, body: resp.cart }
    } 
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating cart'
        
        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}