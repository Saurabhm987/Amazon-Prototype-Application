var connection =  new require('./kafka/Connection');
const mongoose = require('mongoose');
var product = require('./services/product.js');
const mongoPool = require('./database/mongoDbConnection')

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

handleTopicRequest("product",product)




