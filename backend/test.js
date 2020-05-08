var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Amazon App', function () {

    it('GET /allCategories - Verifying category count is greater than 0', function (done) {
        agent.get('/allCategories')
            .then(function (res) {
                expect(res.body.length).to.greaterThan(0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /allSeller - Verifying seller  count is greater than 0', function (done) {
        agent.get('/sellers?search=')
            .then(function (res) {
                expect(res.body.length).to.greaterThan(0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /seller products based on search name should contain name', function (done) {
        agent.get('/seller/5eb2d83f82ef2693d79aa01e/products?searchText=bed&filterCategory=&displayResultsOffset=1')
            .then(function (res) {
                if (res.body.products.length > 0) {
                    let products = res.body.products;
                    for (let product of products) {
                        expect(product.name.toLowerCase()).to.include('bed');
                    }
                }
                else {
                    expect(res.body.products.length).to.equal(0);
                }
                done();

            })
            .catch((e) => {
                done(e);
            });
    });



    it('GET product review of product should get reviews of the same product', function (done) {
        agent.get('/user/productreviews/5eb2d92a82ef2693d79aa020')
            .then(function (res) {
                if (res.body.length > 0) {
                    let productReviews = res.body;
                    for (let productr of productReviews) {
                        expect(productr.product_id).to.include('5eb2d92a82ef2693d79aa020');
                    }


                }
                else {
                    expect(res.body.length).to.equal(0);
                }
                done();

            })
            .catch((e) => {
                done(e);
            });
    });



    it('GET Seller Profile with the id and checking the id', function (done) {
        let sellerId = "5eb2d83f82ef2693d79aa01e"
        agent.get(`/seller/${sellerId}/profile`)
            .then(function (res) {
                if (res.body._id)
                    expect(res.body._id).to.equal(sellerId);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('PUT seller profile details and check the response.', function (done) {
        let sellerDetails = { "id": "5eb2d83f82ef2693d79aa01e", "name": "Vamsi Mundr", "address": { "address1": "329 N, first street ,", "address2": "villa torinos", "city": "Hyderabad", "state": "CA", "zip": "95110" } }
        agent.put(`/seller/profile`)
            .send(sellerDetails)
            .then(function (res) {
                if (res.body._id)
                    expect(res.body.name).to.equal(sellerDetails.name);

                done();

            })
            .catch((e) => {
                done(e);
            });
    });

    it('POST User adding item to cart checking the response', function (done) {
        let cart = { "product_id": "5eb2d92a82ef2693d79aa020", "gift": false, "quantity": 2 }
        agent.post(`/customer/5eb2d9be82ef2693d79aa021/cart`)
            .send(cart)
            .then(function (res) {
                let rsponse_cart = res.body.cart;
                let isProductThere = false;
                for (let product of rsponse_cart) {
                    if (product.product === cart.product_id) {
                        isProductThere = true;
                    }
                }

                expect(isProductThere).to.equal(true);

                done();

            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET  seller Orders checking the correct order id.', function (done) {
        let orderId = "5eb2db6c82ef2693d79aa026"
        agent.get(`/seller/5eb2d83f82ef2693d79aa01e/orders/${orderId}`)
            .then(function (res) {
                if (res.body._id)
                    expect(res.body._id).to.equal(orderId);

                done();

            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET  User payment cards and check his id with it .', function (done) {
        let userID = "5eb2d9be82ef2693d79aa021"
        agent.get(`/profile/cards/${userID}`)
            .then(function (res) {
                if (res.body._id)
                    expect(res.body._id).to.equal(userID);

                done();

            })
            .catch((e) => {
                done(e);
            });
    });



    it('GET  Customer profile check the id.', function (done) {
        let userID = "5eb2d9be82ef2693d79aa021"
        agent.get(`/profile/customer/${userID}`)
            .then(function (res) {
                if (res.body[0]._id)
                    expect(res.body[0]._id).to.equal(userID);

                done();

            })
            .catch((e) => {
                done(e);
            });
    });

})