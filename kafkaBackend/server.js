var connection =  new require('./kafka/Connection');
const mongoose = require('mongoose');
const mongoPool = require('./database/mongoDbConnection')

var addressCard = require('./services/addressCard.js');
var analytics = require('./services/analytics.js');
var buyer = require('./services/buyer.js');
var cartSaveforlater = require('./services/cartSaveforlater.js');
var order = require('./services/order.js');
var products = require('./services/products.js');
var seller = require('./services/seller.js');
var signup = require('./services/signup.js');


// mongo connection
mongoPool


async function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    await consumer.on('message',async function (message) {
        console.log('message received for ' + topic_name +" ", fname);

        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        let res = await fname.handle_request(data.data)
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            await producer.send(payloads, async function(err, data){
                console.log(data);
            });
            return;
        });
        
}

handleTopicRequest("address-card",addressCard)
handleTopicRequest("analytics",analytics)
handleTopicRequest("buyer",buyer)
handleTopicRequest("cart-saveforlater",cartSaveforlater)
handleTopicRequest("order",order)
handleTopicRequest("products",products)
handleTopicRequest("seller",seller)
handleTopicRequest("signup",signup)




