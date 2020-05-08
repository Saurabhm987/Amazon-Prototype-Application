var app = require('../backend/index');//../index
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var assert = require('chai').assert;

var agent = require('chai').request.agent(app);

describe('Amazon App', function () {

    it('GET /getAddress - Verifying customer has at least one address', function (done) {
        agent.get('/address/getAddress/5ea6217130c53720685db7dd')
            .then(function (res) {
                expect(res.body.length).to.greaterThan(0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET /getCard - Verifying customer card info', function (done) {
        agent.get('/card/getCard/5ea6217130c53720685db7dd')
            .then(function (res) {
                console.log(res.body);
                //expect(res.body[0].number).is.include(4100334566776789);
                assert.approximately(res.body[0].number,4100334566776789,0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('PUT update order status', function (done) {
        let updatedStatusPayload={
            "orderId":"5ea7bfc22cc68d1737f2b47f",
            "productId":"5ea29a3a5de6843370680c17",
            "updatedStatus":"Not yet delivered"
        }
        agent.put(`/order/updateStatus`)
            .send(updatedStatusPayload)
            .then(function (res) {
                if (res.body._id)
                    expect(res.body.status.status.toLowerCase()).to.equal(updatedStatusPayload.updatedStatus.toLowerCase());

                done();

            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /product/getCategories - Verifying number of product categories', function (done) {
        agent.get('/product/getCategories')
            .then(function (res) {
                assert.approximately(res.body.length,4,0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /seller/profile/ - Validating Seller profile', function (done) {
        agent.get('/seller/profile/5eb34b42176d324496e40c31')
            .then(function (res) {
                expect(res.body.email.toLowerCase()).to.equal('cloudtail@gmail.com');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET /analytics/sales - Validating Sales related Analytics', function (done) {
        agent.get('/analytics/sales')
            .then(function (res) {
                expect(res.body.topFiveMostSoldProducts[0]._id.name.toLowerCase()).to.equal('oneplus');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /analytics/products - Validating Product related Analytics, getting top rated Product', function (done) {
        agent.get('/analytics/products')
            .then(function (res) {
                expect(res.body.topTenProductsRating[0].name.toLowerCase()).to.include('adidas');
                assert.approximately(res.body.topTenProductsRating[0].overallRating,5,0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /customer/profile/ - Validating Customer profile', function (done) {
        agent.get('/customer/profile/5eb3c925f10e7d6c60224d88')
            .then(function (res) {
                expect(res.body.email.toLowerCase()).to.equal('shubham@gmail.com');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

  it('GET /analytics/products - Validating Product related Analytics, getting top rated Product', function (done) {
        agent.get('/analytics/products')
            .then(function (res) {
                expect(res.body.topTenProductsRating[0].name.toLowerCase()).to.include('adidas');
                assert.approximately(res.body.topTenProductsRating[0].overallRating,5,0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

   /* it('DELETE /analytics/products - Deleting saved for later product', function (done) {
        let savedProductCountBeforeDelete="";

        agent.get('/customer/profile/5eb3c925f10e7d6c60224d88')
            .then(async function (res) {
                savedProductCountBeforeDelete=res.body.saveForLater.length;

                let custProfileAfterDeletion = await agent.delete('/saveForLater/deleteSaveForLater/5eb3c925f10e7d6c60224d88/product/5ea29a3a5de6843370680c17/deleteProductInSaveForLater');
                assert.approximately(custProfileAfterDeletion.body.saveForLater.length,savedProductCountBeforeDelete-1,0);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });*/

})