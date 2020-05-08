const queries = require('../queries/mongoQueries')
userAuth = require('../dbModels/userAuth')
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

seller = require('../dbModels/seller')


handle_request = async (request, callback) => {
    if (request.type === "getAllSellers") {  
        try {

            let findQuery = {}
    
            const result = await queries.findDocumets(seller, findQuery)
    
            return { status: 200, body: result }
    
        } catch (error) {
    
            if (error.message)
                message = error.message
            else
                message = 'Error while getting sellers'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
    }
    else if (request.type === "getSellerProfile") {
        try {

            const { params } = request
    
            let findQuery = { _id: mongoose.Types.ObjectId(params.sellerId) }
            let projection = { password: 0 }
    
            const result = await queries.findDocumets(seller, findQuery, projection)
    
            return { status: 200, body: result }
    
        } catch (error) {
    
            if (error.message)
                message = error.message
            else
                message = 'Error while getting sellers'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
    }
    else if (request.type === "updateSellerProfile") {
        try {

            const { body, params, file } = request
    
            console.log('request update seller - ', request)
    
            const {
                email,
                password,
                name,
                image,
                street1,
                city,
                state,
                country,
                pincode,
            } = body
    
            let findQuery = { _id: mongoose.Types.ObjectId(params.sellerId) }
    
            var updateQuery = {}
    
            var address = {
                street1: street1,
                city: city,
                state: state,
                country: country,
                pincode: pincode
            }
    
            if (file && file[0] && (file[0].location !== null || file[0].location !== undefined)) {
    
                updateQuery = {
                    $set: {
                        email: email,
                        name: name,
                        image: file[0].location,
                        address: address
                    }
                }
            } else {
    
                updateQuery = {
                    $set: {
                        email: email,
                        name: name,
                        address: address,
                        image: image
                    }
                }
            }
    
            var authUpdate = {}
    
            if (password !== null && password !== undefined && password.length > 0) {
    
                authUpdate = {
                    $set: {
                        name: name,
                        email: email,
                        password: hashPassword(password)
                    }
                }
    
                console.log('takin else -----------')
            } else {
    
                authUpdate = {
                    $set: {
                        name: name,
                        email: email,
                    }
                }
            }
    
    
            const authUpdtateResult = await queries.updateField(userAuth, findQuery, authUpdate)
    
            console.log('auth update result', authUpdtateResult)
    
            const result = await queries.updateField(seller, findQuery, updateQuery)
    
            console.log('final result - ', result)
    
            return { status: 200, body: result }
    
        } catch (error) {
    
            if (error.message)
                message = error.message
            else
                message = 'Error while getting sellers'
    
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
    
            return { "status": code, body: { message } }
        }
    }
    
}
exports.handle_request = handle_request;
