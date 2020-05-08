// const client = require('../index')

// module.exports = cachedcategories = (req, res, next) => {
    
//     console.log('cache category call.....')

//     client.get('categories', (error, data) => {
//         if(error) throw error;

//         if(data !== null){
//             res.status(200).json(JSON.parse(data))
//         }else{
//             next()
//         }
//     })
// }