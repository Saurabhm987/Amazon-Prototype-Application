const client = require('../index')

client.on("connect", () => {
    console.log('Your are connected to Redis');
});

module.exports = cachedcategories = (req, res, next) => {
  
    client.get('categories', (error, data) => {
        if(error) throw error;

        if(data !== null){
            res.status(200).json(JSON.parse(data))
        }else{
            next()
        }
    })
}
