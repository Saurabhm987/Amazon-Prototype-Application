var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        
            // this.client = new kafka.KafkaClient("localhost:2181");
            this.client = new kafka.KafkaClient({kafkaHost: "54.86.15.236:9093,54.86.15.236:9092"});
            // this.client = new kafka.KafkaClient({kafkaHost: "18.232.154.226:9092"});
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: topic_name, partition: 0 }]);
            this.client.on('ready', function () { console.log('client ready!') })
        
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            // this.client = new kafka.KafkaClient("localhost:2181");
            this.client = new kafka.KafkaClient({kafkaHost: "54.86.15.236:9093,54.86.15.236:9092"});
            // this.client = new kafka.KafkaClient({kafkaHost: "18.232.154.226:9092"});
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;