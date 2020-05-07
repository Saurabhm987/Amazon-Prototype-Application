const queries = require('../queries/mongoQueries')
seller = require('../dbModels/seller')

const getAllSeller = async () => {

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

module.exports = {
    getAllSeller: getAllSeller,
}