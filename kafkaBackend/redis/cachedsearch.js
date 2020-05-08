// const client = require('../index')

// module.exports = cachedsearch = (req, res, next) => {
//     console.log('cached search call.....')
    
//     client.get('products', (error, reply) => {
//         if(error) throw error
        
//         if(reply !== null){
//             res.status(200).json(JSON.parse(reply))
//         }else{
//             next()
//         }
//     })
// }