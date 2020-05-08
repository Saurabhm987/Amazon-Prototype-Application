const countDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query, options).lean().count();
    } catch (error) {
        console.log("Error while fetching data:" + error)
        throw new Error(error);
    }
}

//todo the parameters should be sent as a single object and be retireved individually within the func
//misses cases where middle parameters are to be skipped, requires ...Array(number),
// see usage in paginated Result Function in order service.
const findDocumentsByQueryFilter = async (modelObject, query, projection, filter, options) => {
    console.log("in filter query ");

    try {
        console.log("in filter query")
        if (!projection) {
            projection = {}
        }
        if (!filter) {
            filter = {}
        }

        return await modelObject.find(query, projection, options).lean().sort(filter.sort).skip(filter.skip).limit(filter.limit);
    } catch (error) {
        console.log("Error while fetching data:" + error)
        throw new Error(error);
    }
}


const findDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query, options).lean();
    } catch (error) {
        console.log("Error while fetching data:" + error)
        throw new Error(error);
    }
}

const updateField = async (modelObject, filters, update) => {
    try {
        return await modelObject.findOneAndUpdate(filters, update, { useFindAndModify: false, new: true });
    } catch (error) {
        console.log("Error while fetching data:" + error)
        throw new Error(error);
    }
}

const createDocument = async (modelObject, data) => {
    try {
        const newData = await new modelObject(data)
        return response = await newData.save()
    } catch (error) {
        console.log('error while creating document')
        throw new Error(error)
    }
}

const findDocumets = async (modelObject, findQuery, projection) => {
    try {
        const response = await modelObject.find(findQuery, projection).lean();
        if (response.length > 0) {
            return response;
        }
        else {
            throw ("Record not found");
        }

    } catch (error) {
        throw new Error(error)
    }
}

const deleteDocuments = async (modelObject, findQuery, projection) => {

    try {
        return response = await modelObject.deleteOne(findQuery, projection);

    } catch (error) {
        throw new Error(error)
    }
}


const findDocumentsById = async (modelObject, documentId) => {
    try {
        return response = await modelObject.findById(documentId)
    } catch (error) {
        console.log('error while getting documet by id')
        throw new Error(error)
    }
}


const aggregationQuery = async (modelObject, query) => {

    try {
         
        response = await modelObject.aggregate(query)
        console.log('aggreation respone  - ', response)
        return response

    } catch (error) {
        console.log('error while aggregating by id')
        throw new Error(error)
    }
}


module.exports = {
    findDocumentsByQuery: findDocumentsByQuery,
    findDocumentsByQueryFilter: findDocumentsByQueryFilter,
    countDocumentsByQuery: countDocumentsByQuery,
    updateField: updateField,
    createDocument: createDocument,
    findDocumets: findDocumets,
    findDocumentsById: findDocumentsById,
    deleteDocuments: deleteDocuments,
    aggregationQuery:aggregationQuery,
}
