const queries = require('../queries/mongoQueries')
userAuth = require('../dbModels/userAuth')
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}


const getAllSeller = async () => {

    try {

        let findQuery = { 'userType': 'seller' }

        const result = await queries.findDocumets(userAuth, findQuery)

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


const getSellerProfile = async (request) => {

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


const updateSellerProfile = async (request) => {

    try {

        const { body, params } = request

        const {
            email,
            password,
            name,
            image,
            address,
            description,
        } = body

        let findQuery = { _id: mongoose.Types.ObjectId(params.sellerId) }

        let updateQuery = {

            $set: {
                email: email,
                password: hashPassword(password),
                name: name,
                image: image,
                description: description,
                address: address
            }
        }

        let authUpdate = {
            $set: {
                name: name,
                email: email,
                password: hashPassword(password)
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

module.exports = {
    getAllSeller: getAllSeller,
    getSellerProfile: getSellerProfile,
    updateSellerProfile: updateSellerProfile,
}