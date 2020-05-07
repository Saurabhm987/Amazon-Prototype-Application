// const client = require('../index')

// module.exports = cachedcart = (req, res, next) => {

//     console.log('cached cart call.....')

//     const { id } = req.params

//     client.get(`"cart-${id}"`, (error, data) => {
//         if(error) throw error
        
//         if(data !== null){
//             res.status(200).json(JSON.parse(data))
//         }else{
//             next()
//         }
        
//     })
// }
