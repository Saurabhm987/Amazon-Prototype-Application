var faker = require('faker');

module.exports = fakerproduct = async () => {
    
        let body = {
            name:faker.commerce.productName(),
            seller: { sellerName:faker.internet.userName(), _id:faker.random.number()},
            category: faker.commerce.department(),
            price:faker.commerce.price(),
            description: faker.lorem.sentence(),
            quantity:faker.random.number(),
            giftPrice:5,
            views:faker.random.number(),
            removed: false
        }

        return body
}