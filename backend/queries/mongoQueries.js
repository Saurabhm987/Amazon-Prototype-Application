const countDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query,  options).lean().count();
    } catch (error) {
        console.log("Error while fetching data:" + error)
        throw new Error(error);
    }
}


const findDocumentsByQueryFilter = async (modelObject, query, projection, filter, options) => {
    console.log("in filter query")

    try {
        console.log("in filter query")
        if (!projection) {
            projection = {}
        }
        if (!filter) {
            filter = {}
        }
        console.log(query)
        console.log(projection)
        console.log(filter)

        
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

const createDocument =  async (modelObject, data) => {
    try{
        const newData = await new modelObject(data)
        return response = await newData.save()
    }catch(error){
        console.log('error while adding product')
        throw new Error(error)
    }
}

const findDocumetsById = async (modelObject, findQuery) => {
    try{
        return response = await modelObject.findDocumetById(findQuery)
    }catch{
        console.log('error while getting seller document')
        throw new Error(error)
    }
}

module.exports ={
    findDocumentsByQuery:findDocumentsByQuery,
    findDocumentsByQueryFilter:findDocumentsByQueryFilter,
    countDocumentsByQuery:countDocumentsByQuery,
    updateField:updateField,
    createDocument:createDocument,
    findDocumetsById:findDocumetsById,
}



