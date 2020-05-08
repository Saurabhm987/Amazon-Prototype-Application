const queries = require('../queries/mongoQueries')
userAuth = require('../dbModels/userAuth')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')



buyer = require('../dbModels/buyer')

const getCustomerProfile = async (request) => {

    try {

        const { params } = request

        let findQuery = { _id: mongoose.Types.ObjectId(params.customer_id) }
        let projection = { password: 0 }

        const result = await queries.findDocumets(buyer, findQuery, projection)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while getting profile'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }

}


const updateCustomerProfile = async (request) => {

    try {

        const { body, params, file } = request

        console.log('request update seller - ', request)

        const { name, image } = body

        let findQuery = { _id: mongoose.Types.ObjectId(params.customer_id) }

        var updateQuery = {}

        if (file && file[0] && (file[0].location !== null || file[0].location !== undefined)) {

            updateQuery = {
                $set: {
                    name: name,
                    image: file[0].location,
                }
            }
        } else {
            updateQuery = {
                $set: {
                    name: name,
                    image: image
                }
            }
        }

        // var authUpdate = {}
        // if (password !== null && password !== undefined && password.length > 0) {
        //     authUpdate = {
        //         $set: {
        //             name: name,
        //             email: email,
        //             password: hashPassword(password)
        //         }
        //     }
        //     console.log('takin else -----------')
        // } else {
        //     authUpdate = {
        //         $set: {
        //             name: name,
        //             email: email,
        //         }
        //     }
        // }
        // const authUpdtateResult = await queries.updateField(userAuth, findQuery, authUpdate)
        // console.log('auth update result', authUpdtateResult)

        const result = await queries.updateField(buyer, findQuery, updateQuery)

        console.log('final result - ', result)

        return { status: 200, body: result }

    } catch (error) {

        if (error.message)
            message = error.message
        else
            message = 'Error while updating sellers'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return { "status": code, body: { message } }
    }
}

module.exports = {
    getCustomerProfile: getCustomerProfile,
    updateCustomerProfile: updateCustomerProfile,
}